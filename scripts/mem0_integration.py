import sys
import os
import argparse
import json

# JonBeatz.dev site memory — fully separate Qdrant collection + path so it
# never touches jonbeatz_personal. Overridable via env for flexibility.
USER_ID = os.environ.get("JBD_MEM0_USER", "jonbeatz_dev")
COLLECTION = os.environ.get("JBD_MEM0_COLLECTION", "jonbeatz_dev_memories")
QDRANT_DIRNAME = os.environ.get("JBD_MEM0_QDRANT_DIR", "qdrant_jonbeatz_dev")


def get_memory_instance():
    from mem0 import Memory

    user_home = os.path.expanduser("~")
    mem0_dir = os.path.join(user_home, ".mem0")
    os.makedirs(mem0_dir, exist_ok=True)

    config = {
        "vector_store": {
            "provider": "qdrant",
            "config": {
                "collection_name": COLLECTION,
                "path": os.path.join(mem0_dir, QDRANT_DIRNAME),
                "embedding_model_dims": 384,
            },
        },
        "llm": {
            "provider": "lmstudio",
            "config": {
                "model": os.environ.get("MEM0_LM_MODEL", os.environ.get("HERMES_LM_MODEL", "qwen3-4b-instruct-2507")),
                "lmstudio_base_url": "http://127.0.0.1:1234/v1",
                "temperature": 0.1,
                "max_tokens": 512,
                "lmstudio_response_format": {"type": "json_schema", "json_schema": {"type": "object", "schema": {}}},
            },
        },
        "embedder": {
            "provider": "huggingface",
            "config": {"model": "multi-qa-MiniLM-L6-cos-v1"},
        },
    }
    return Memory.from_config(config)


def main():
    parser = argparse.ArgumentParser(description="JonBeatz.dev site Mem0 integration layer")
    parser.add_argument("--action", choices=["add", "search", "list", "delete", "get_all"], required=True)
    parser.add_argument("--text", help="Text to add (required for add)")
    parser.add_argument("--query", help="Query to search (required for search)")
    parser.add_argument("--id", help="Memory ID to delete (required for delete)")
    parser.add_argument("--infer", action="store_true", default=False,
                        help="Use LLM fact extraction on add (default: infer=False)")
    args = parser.parse_args()

    needs_lm_studio = args.action == "search" or (args.action == "add" and args.infer)
    if needs_lm_studio:
        import urllib.request
        try:
            urllib.request.urlopen("http://127.0.0.1:1234/v1/models", timeout=2)
        except Exception:
            print("[Mem0 Warning] Local LM Studio endpoint (http://127.0.0.1:1234/v1) is not online. Start LM Studio's local server on port 1234.")
            sys.exit(1)
        import subprocess
        try:
            res = subprocess.run(["lms", "ps"], capture_output=True, text=True)
            if "No models are currently loaded" in res.stdout or not res.stdout.strip():
                print("[Mem0 Warning] No local LLM model loaded in LM Studio. Load a model first.")
                sys.exit(1)
        except Exception:
            pass

    try:
        m = get_memory_instance()
        if args.action == "add":
            if not args.text:
                print(json.dumps({"success": False, "error": "--text is required for add action"}))
                sys.exit(1)
            res = m.add(args.text, user_id=USER_ID, infer=args.infer)
            results = res.get("results", []) if isinstance(res, dict) else []
            if not results:
                print(json.dumps({"success": False,
                                  "error": "Memory add returned no results. Try infer=False (default) or shorten text.",
                                  "data": res}))
                sys.exit(1)
            print(json.dumps({"success": True, "data": res}))

        elif args.action == "search":
            if not args.query:
                print(json.dumps({"success": False, "error": "--query is required for search action"}))
                sys.exit(1)
            res = m.search(args.query, filters={"user_id": USER_ID})
            print(json.dumps({"success": True, "data": res}))

        elif args.action == "list" or args.action == "get_all":
            res = m.get_all(filters={"user_id": USER_ID})
            print(json.dumps({"success": True, "data": res}))

        elif args.action == "delete":
            if not args.id:
                print(json.dumps({"success": False, "error": "--id is required for delete action"}))
                sys.exit(1)
            res = m.delete(args.id)
            print(json.dumps({"success": True, "data": res}))

    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))
        sys.exit(1)


if __name__ == "__main__":
    main()

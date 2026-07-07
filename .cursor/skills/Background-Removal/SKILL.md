# Background-Removal — Remove Image Backgrounds with AI (rembg)

## When to use this skill

- Extracting logos, text, or foreground objects from solid or complex backgrounds
- Converting JPG/PNG images with dark/white backgrounds into transparent PNGs
- Generating clean transparent assets for websites, branding, or compositing

## Tool: rembg + U^2-Net

**rembg** ([github.com/danielgatis/rembg](https://github.com/danielgatis/rembg)) is a free, open-source (MIT) Python library that uses the **U^2-Net** AI model to remove image backgrounds. It runs entirely locally — no API calls, no credits, no internet after the first-run model download.

- **Model size:** ~176 MB (U^2-Net ONNX)
- **Model cache:** `%USERPROFILE%\.u2net\u2net.onnx` (downloaded once, cached forever)
- **License:** MIT (completely free, commercial use allowed)
- **Platform:** Windows / macOS / Linux

## Installation

```powershell
pip install rembg
```

This installs rembg and its dependencies (onnxruntime, numpy, Pillow, scikit-image).

### First run

On first use, rembg auto-downloads the U^2-Net model (~176 MB) from GitHub to `%USERPROFILE%\.u2net\u2net.onnx`. Subsequent runs use the cached model instantly.

> **Note:** If your default `python` is inside a venv (e.g. Hermes agent), use the system Python directly:
> ```powershell
> & 'C:\Users\JONBEATZ\AppData\Local\Programs\Python\Python312\python.exe' -m pip install rembg
> ```

## CLI Usage

```powershell
rembg i input.jpg output.png
rembg i input.png output.png
```

## Programmatic Usage (Python script)

Save this as `scripts/remove-bg.py` in your project:

```python
"""Remove background from image using rembg."""
import sys
import os
from PIL import Image

os.environ["REMBG_USE_SILICON"] = "0"

from rembg import remove, new_session

input_path = sys.argv[1]
output_path = sys.argv[2] if len(sys.argv) > 2 else os.path.splitext(input_path)[0] + "-nobg.png"

print("Loading rembg model...")
session = new_session()

with open(input_path, "rb") as f:
    input_data = f.read()

print("Removing background...")
output_data = remove(input_data, session=session)

with open(output_path, "wb") as f:
    f.write(output_data)

print(f"Saved: {output_path}")
```

Run with:
```powershell
python scripts/remove-bg.py input.jpg output.png
```

## Verification

After processing, check the result by:
1. Opening the PNG in an image viewer — checkerboard pattern = transparency is working
2. Compositing on a dark background to verify edge quality is clean

Optional dark-background preview (appended to the same script):

```python
img = Image.open(output_path).convert("RGBA")
dark_bg = Image.new("RGBA", img.size, (5, 5, 15, 255))
dark_bg.paste(img, (0, 0), img)
preview_path = os.path.splitext(output_path)[0] + "-on-dark.png"
dark_bg.save(preview_path, "PNG")
```

## Best Practices

| Situation | Recommendation |
|-----------|---------------|
| **JPG source** | JPG compression creates edge artifacts. rembg handles this well, but PNG source is always cleaner |
| **Dark backgrounds** | Works great — U^2-Net handles both light and dark backgrounds |
| **Complex backgrounds** | rembg handles natural/photo backgrounds well. For tricky edges, try the `u2net_human_seg` or `u2netp` (lightweight) models |
| **Batch processing** | Loop through files in a directory with a simple for loop |

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `ModuleNotFoundError: No module named 'rembg'` | You installed rembg in a different Python. Use the full Python path (see Installation note above) |
| `Numba needs NumPy X or less` | NumPy version conflict. Use `pip install "numpy<2.5"` to downgrade |
| `ImportError: cannot import name 'remove'` | Try `from rembg.bg import remove` (older rembg versions) |
| Model download fails | The model is from `github.com/danielgatis/rembg/releases/download/v0.0.0/u2net.onnx` — check network connectivity |

# Agricultural translator 

**Install PyTorch with CUDA support** (Windows):
   ```
   uv pip uninstall torch
   uv pip install torch --index-url https://download.pytorch.org/whl/cu121  
   $env:PYTORCH_CUDA_ALLOC_CONF="expandable_segments:True"  
   ```  

## How to run  
### Backend  
```
docker run --name agritranslate-redis -p 6379:6379 -d redis:7 
cd backend
uv run --no-sync .\app\main.py (If you installed cuda torch, otherwise uv run .\app\main.py)
```
### Frontend  
open ```index.html``` in browser
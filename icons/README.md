
Bash script (for macOS, as it uses sips) to resize 'invidious-linker.png' into pngs of required sizes.

```sh
# cd into icons directory

# Create 16x16 icon
sips -z 16 16 invidious-linker.png --out invidious-linker-16x16.png

# Create 48x48 icon
sips -z 48 48 invidious-linker.png --out invidious-linker-48x48.png

# Create 128x128 icon
sips -z 128 128 invidious-linker.png --out invidious-linker-128x128.png
```







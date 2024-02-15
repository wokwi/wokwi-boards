# wokwi-boards

Definition for the boards supported on [wokwi.com](https://wokwi.com).

See [boards/esp32-devkit-v1/board.json](boards/esp32-devkit-v1/board.json) for an example.

## Board contribution guidelines

Please review the [contribution guidelines](https://docs.google.com/document/d/1K59xkKL70uN_c_GNCs_Xk09F3tK12B-ygmFbw6i14t4/edit#heading=h.92fnwowlaoo8) before submitting a new board definition.

## Testing a custom board

1. Create a [new project on wokwi](https://wokwi.com/arduino/new)
2. Click inside the code editor, press "F1" and choose "Load custom board file..."
3. Select the directory that contains the board definition files (board.json and board.svg)
4. The board should load into Wokwi. Check the browser JavaScript console for any error messages.
5. Paste the following code into the diagram.json file:

```json
{
  "version": 1,
  "author": "Ambitious maker",
  "editor": "wokwi",
  "parts": [{ "type": "wokwi-custom-board", "id": "board" }],
  "connections": []
}
```

Your custom board should appear in the diagram editor. You can test the pin out, connect external
components to it, and even start the simulation.

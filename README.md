# CSM

CSM is a CLI tool build in typescript to store your code snippets. Create and access your code snippets with the
command line interface. Search through the saved code snippets to have a quick look.

<div align="center">

![csm](https://github.com/Aman-zishan/CSM/assets/55238388/b08503f7-087b-47ae-9cc5-6d4d75350a05)

</div>

## TUI

launch the interface

```bash
csm -l
```

<div>

<summary>Key Bindings</summary>

<br />

| Action | Key |
| :--- | :--- |
| Copy selected snippet to clipboard | <kbd>c</kbd> |
| Delete selected snippet | <kbd>d</kbd> |
| Search for snippets | <kbd>/</kbd> |
| Go back (exit from search) | <kbd>esc</kbd> |
| Quit application | <kbd>q</kbd> <kbd>ctrl+c</kbd> |

</div>


## Command Line Interface

```bash
#help command
csm -h

#save a new snippet
csm -s <filepath>

#example:

csm -s hello.py
```

## installation

```bash

npm install -g csm
```






![csm logo](https://github.com/Aman-zishan/CSM/assets/55238388/18961d71-e87d-4e53-939b-2238c60a09d1)

CSM is a CLI tool build in typescript to store your code snippets. Create and access your code snippets with the
command line interface. Search through the saved code snippets to have a quick look.

</br>



## Text User Interface

<div align="center">

![csm](https://github.com/Aman-zishan/CSM/assets/55238388/b08503f7-087b-47ae-9cc5-6d4d75350a05)

</div>

launch the interface

```bash
csm-kit -l
```


### Key Bindings
<br />

| Action | Key |
| :--- | :--- |
| Copy selected snippet to clipboard | <kbd>c</kbd> |
| Delete selected snippet | <kbd>d</kbd> |
| Search for snippets | <kbd>/</kbd> |
| move up/down the list | <kbd>↑</kbd> <kbd>↓</kbd> |
| select snippet | <kbd>enter</kbd> |
| Go back (exit from search) | <kbd>esc</kbd> |
| Quit application | <kbd>q</kbd> <kbd>ctrl+c</kbd> |




## Command Line Interface

```bash
#help command
csm-kit -h

#save a new snippet
csm-kit -s <filepath>

#example:

csm-kit -s hello.py
```

## installation

```bash

npm install -g csm-kit
```





# Notes

- Browser-Run, Although it is a great package it seems to be missing some key features that this would need to work. Primarly the script that is used to on the client simply reports console.logs to the server and that is it. It would be great to have that functionality as well but I think a whole differnt script needs to be made that ( `server` module ) that will allow for a more event baseded system that the use can tie into.

- Data transfer, It look like [ xws ]( https://github.com/substack/xhr-write-stream ) will be great for this, that is currently what browser-run uses. Some more investigation is need to see if it can support thing like blob data event though I dont know how that will work with our event patterns needed.

- Writing scripts to page. I feel that the client script should accomidate this. Use the same messaging system as the one exposed to the user except have a special event that will evaluate code into a code block.

- use shoe
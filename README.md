# VK-Music-RPC-for-Discord
VK Music RPC creator with music name and author 

## Instalation
### Packing the code yourself
- Download the code
- Do `npm install` in the main folder
- Install pkg module `npm install -g pkg`
- Pack the main folder files using package.json `pkg .`
- Go to the setup folder, and do the same steps

You can download the build from realises

### Using the software
After you got the main executable and setuper, run the setuper.
In first step you need to pass your vk id or your url name. (ex: https://vk.com/id1234567 or https://vk.com/username)
Second step choose if you want to have a button in rpc, which links to your profile or not
Third step is to choose language from the list, or leave it blank for english.

After the setup, you are good to go! Just run the main executable when discord app is on.

### Possible Error Codes
- Error code 0: The setup is not done, or is done purely, or the file is damaged. To fix this redo the setup.
- Error code 1: This is not an error, if it doesn't stop, then there is error with the code, or with the client part.
- Error code 2: The link to account is invalid, or there are server issues. This only happens when server throws >=400 errors
- Error code 3: Discord is not turned on. You need to turn discord on before running this file. This will be fixed in other versions.

### Next Tasks
- [ ] Change the code to work with VK API
- [ ] Add other languages too
- [ ] Add pictures to Readme
- [ ] Fix Timeouts so console doesn't close 
- [ ] Add other operation version executables in releases

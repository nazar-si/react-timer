# Pomodoro Timer
This is simple pomodoro timer for creating a more productive work environment. The timer is set to 25 minutes of work and 5 minutes of break. After 4 work sessions, the break is extended to 15 minutes. The timer can be paused and reset at any time.

## Features
- [x] Timer with three modes
- [x] Task list 
- [x] Dark and light theme
- [ ] Sound effects
- [ ] Statistics charts 
- [ ] Notification system
- [ ] Task groups
- [ ] Count pomodoros and switch timers automatically
- [ ] Save settings presets locally

## Technologies
Project is created with:
* React + Zustand
* Vite
* Yarn
* Tailwind CSS

## Run locally
To run this project locally, install it using npm:
```
npm install
```
Then run it with:
```
npm run dev
```
You can also run linting and testing with:
```
npm run lint
npm run test
```

## TODO
- [x] Go from setInterval to Date to remove reliance on intervals and asynchronous code + allow timer to go while device is in sleep
- [x] Setup localStorage migration pipeline
- [x] BUG: Starting timer after 0:0 and adding some time to it results in adding this time to maxTime
- [x] Rewrite interval instantiation to ensure that only one istance is running at a time
- [ ] Add eslint and prettier then add vscode actions on save
- [ ] Clean up before making repo public
- [ ] Add footer to with Copyright and project repo link
- [ ] Add screen awaking feature to keep timer on screen
- [ ] Extends tasks to support description
- [ ] Add some task UI on hover - options  
- [ ] Extract tasks into components
- [ ] Add CI/CD with github actions
- [ ] Add DnD for tasks
- [ ] BUG: Set interval stops after some time while working on another tab
- [ ] Fix first second being missed on launch
- [ ] Refactor first time 
  - [ ] Sparate styles from component 
  - [ ] Decompose components into multiple smaller ones 
- [ ] Setup some E2E tests with playwright
- [ ] All uncomplited in [features](##Features)
# XVDREAMS

This is a prototype of xvdreams web application.

## Instalación

Usar [npm](https://www.npmjs.com/) para instalar el cliente de Firebase.

```bash
npm install -g firebase-tools
```

Iniciar sesión con nuestra cuenta empresarial en Firebase
```bash
firebase login
```
```bash
Allow Firebase to collect CLI and Emulator Suite usage and error reporting information? Yes
```
Iniciar el proyecto de Firebase en local
```bash
firebase init
```
Cuando se muestre este dialogo
```bash
Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices. (Press <space> to select, <a> to toggle all, <i> to invert selection, and 
<enter> to proceed)
```
Sólo seleccionar estas opciones:
```bash
◯ Firestore: Configure security rules and indexes files for Firestore
◯ Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys
```
Luego:
```bash
? Please select an option: Use an existing project
? Select a default Firebase project for this directory: xvdreams-web-app (xvdreams web app)
i  Using project xvdreams-web-app (xvdreams web app)
? Would you like to configure generated SDKs now? No
```

Y listo, ya estaría todo el proyecto iniciado en local

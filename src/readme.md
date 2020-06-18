# Notification

_\$ npm install --save react-toastify_

```js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.dark(`Bienvenue ${pseudo} LETS GO!!!!`, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  bodyClassName: "toast-dark",
});
```

# Stepper

_react-stepper-horizontal_

<!-- npm install react-stepper-horizontal --save -->

```js
render() {
  return (


    <div>
      <Stepper steps={ [{title: 'Step One'}, {title: 'Step Two'}, {title: 'Step Three'}, {title: 'Step Four'}] } activeStep={ 1 } />
    </div>


  );
}
```

# Icons

_npm install react-icons --save_

url(https://react-icons.github.io/react-icons/icons?name=di)

```js
import { FaBeer } from "react-icons/fa";
class Question extends React.Component {
  render() {
    return (
      <h3>
        {" "}
        Lets go for a <FaBeer />?{" "}
      </h3>
    );
  }
}
```

# tooltip

----- > Logout Compoonent
_npm install react-tooltip_

# Api Marvel :

_Par exemple, un utilisateur avec une clé publique de "1234" et une clé privée de "abcd" pourrait construire un appel valide comme suit:_
_http://gateway.marvel.com/v1/public/comics? ts=1& apikey=1234&hash=ffd275c5130566a2916217b101f26150 (la valeur de hachage est le résumé md5 de 1abcd1234)_

- Decomposition :
  ts=1

apikey=a03eb9ee3ce32a5fd3231caa2b95093b

hash=md5( ts + privateKey + publicKey )

hash=md5( 1 + 6a7ea6f9e6917b90355e01610b695649c563d7f4

- a03eb9ee3ce32a5fd3231caa2b95093b)

md5( 16a7ea6f9e6917b90355e01610b695649c563d7f4a03eb9ee3ce32a5fd3231caa2b95093b)

## md5 generator sur google :

_hash= 234f9875e6df6c2bc98658291b3c9cd8_

public key securisé :

a03eb9ee3ce32a5fd3231caa2b95093b

créer un environnement variable à la racine du projet .env
et placer:
REACT_APP_MARVEL_API_KEY=a03eb9ee3ce32a5fd3231caa2b95093b à l'interieur

cela evitera de déployer notre private Key sur gitHub

aller dans gitIgnore et placer :
// # api Keys
.env

fichier .env
REACT_APP_MARVEL_API_KEY=a03eb9ee3ce32a5fd3231caa2b95093b\*
REACT_APP_FIREBASE_API_KEY=AIzaSyCWDJDzDtvkW93UvguoXtyoU9ZLt587Tdo
REACT_APP_FIREBASE_AUTH_DOMAIN=m-quiz-3856a.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://m-quiz-3856a.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=m-quiz-3856a
REACT_APP_FIREBASE_STORAGE_BUCKET=m-quiz-3856a.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=657126192261
REACT_APP_FIREBASE_APP_ID=1:657126192261:web:676c616178c9df1a52e5ec

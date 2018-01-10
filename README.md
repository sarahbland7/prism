# Prism

Prism is a codelab for [Firebase](https://firebase.google.com), Google's
backend as a service.

With Prism, we're going to create a site where users can explore colors.

Users will be able to:
  1. Explore all the named colors in the database,
  2. Name their own colors,
  3. Add comments to colors,
  4. Relate colors,
  5. Build palettes,
  6. And some other features we'll dream up later 😉

We've picked colors because, well, there are an awful lot of them,
they're easy to display, and if we're a little clever about how we
display them, the resulting pages will be quite attractive.

# About Firebase

Firebase provides a backend as a service. Unlike apps written with a traditional Node/Express backend, you don't manage the server. Instead,
you write code that uses the Firebase client libraries, and use the Firebase
command line tools to deploy it to Google's servers.

This is both good and bad.

It's good because a huge amount of work is being done for you. Firebase handles authentication, database storage, large file storage, push messaging, and a bunch of other features out of the box. You can use these features without writing a single line of server code---your frontend code talks to the database directly.

You're also freed from a lot of the work of *running* an app. An app that's entirely hosted on Firebase can run basically forever, scaling to nearly any load, without any intervention from you. (I have projects that are years old and still functional). You don't have to worry about what happens if your app goes viral and suddenly your load increases 1000x; Firebase just handles it. Basically, you are not on call for your app, some poor <a title='Site Reliability Engineer'>SRE</a> at Google is.

It's bad because you're locked in. If you're on Firebase, you're on Firebase. You can move from Heroku to AWS without changing code. You *can't* move from Firebase to AWS without changing code, because AWS doesn't support the Firebase libraries. Firebase is quite price competitive right now (projects with little traffic, like Prism, are free), but if Google decides to jack up the prices or eliminate the free tier, well, then you have a problem.

The other bad (or not-so-great) thing is that you need to sign up for Firebase to develop an app. The silver lining is that deployment is going to be super easy.

# 0. Set your Firebase account and the tools

Perform these incantations:

```sh
npm install
npx firebase login
```

This will pop up a browser. Link Firebase to your Google account,
then visit [the Firebase console](https://console.firebase.google.com/)
and create a project.

Then, prepare the repo:

```sh
npm prepare
```

This will ask which Firebase project you want to use. Pick the one you just created. The command will add config information to [`fire/setup.js`](./fire/setup.js).

Finally, start your project:

```sh
npm start
```

In the future, this is all you'll have to do.

# 1. Get acquainted

Take a look around this repo---it's a little different than you've seen before.

The frontend starts in [`main.js`](./main.js). The root of the react app
is in [`App.jsx`](./App.jsx).

You'll notice that there's no `server` folder---we don't need one for this project.

There's seed data is in `./data/colors.json`. This is a JSON file describing an array of `{name: String, color: {r: Number, g: Number, b: Number}}`.

## a word about ~
You might have noticed that, in places, we're importing `~/fire` or `~/App`. If you're familiar with Unix, you know `~` as your home directory. That's not what it means here (though it's similar).

[Our webpack config](./webpack.config.js) aliases `~` to mean "the root of the app". This is to avoid the common bug (and readability issue) of having a bunch of `../../../..`s in our `import`. With this alias, you can `import firebase from '~/fire'` anywhere in your app, without worrying about how many `..`s to have in the relative path.

## ~/fire

You can import the various Firebase APIs from `~/fire`. For instance:

```js
  import firebase, {auth} from '~/fire'

  const google = firebase.auth.GoogleAuthProvider
  auth.signInWithPopup(google)
```

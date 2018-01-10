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

### Set up the Firebase command line tools

```sh
npm install
npx firebase login
```

This will pop up a browser. Allow Firebase to access your Google account.

### Set up your Firebase project

1. Go to [the Firebase console](https://console.firebase.google.com/)
   and create a project.
2. Visit the project's page in the console, and go to `Develop > Database`.
   You'll be asked to pick between the the Realtime Database and Cloud Firestore. Pick *Try Firestore Beta*
3. You'll be asked what security mode to start in. Pick *Start in test mode* (this is *not* the default, because it's *insecure*, but it will make our lives easier for the moment).

### Add the Firebase config to your repo

This is just one command:

```sh
npm prepare
```

This will ask which Firebase project you want to use. Pick the one you just created. You can give it any alias you want.

The command will add config information to [`fire/setup.js`](./fire/setup.js).

### Finally, start your dev server

```sh
npm start
```

In the future, this is all you'll have to do to launch the dev server.

# 1. Get acquainted

You can most likely find your app running on [port 8080](http://localhost:8080). It is, as you can see, pretty minimal.

Take a look around this repo---it's a little different than you've seen before.

The frontend starts in [`main.js`](./main.js). The root of the react app
is in [`App.jsx`](./App.jsx).

You'll notice that there's no `server` folder---we don't need one for this project.

There's seed data is in `./data/colors.json`. This is a JSON file describing an array of `{name: String, color: {r: Number, g: Number, b: Number}}`.

### a word about ~
You might have noticed that, in places, we're importing `~/fire` or `~/App`. If you're familiar with Unix, you know `~` as your home directory. That's not what it means here (though it's similar).

[Our webpack config aliases `~`](./webpack.config.js#L16) to mean "the root of the app". This is to avoid the common bug (and readability issue) of having a bunch of `../../../..`s in our `import`. With this alias, you can `import firebase from '~/fire'` anywhere in your app, without worrying about how many `..`s to have in the relative path.

## 2. Think about our database structure

Read about the [Firestore data model](https://firebase.google.com/docs/firestore/data-model).

Look at [`data/colors.json`](./data/colors.json).

Answer these questions:

<details>
  <summary>*What's the signature of the array? (What types does it contain?)*</summary>
  <p>
  It's an array of `{name: String, color: {r: Number, g: Number, b: Number}}`
  </p>
</details>

<details>
  <summary>
  We can think of this file as relating RGB colors and names. *What's the nature of this relationship? Is it 1:1, 1:many, or many:many?*</summary>
  <p>
  It's a *many:many* relationship. If you look carefully at `colors.json`,
  you'll see several different `blue`s, and also several different names for
  the same RGB color.
  </p>
</details>

When modeling our database, we also want to think about how our data will
be *used*. For Prism, our requirements are:

- Sort colors by r, g, or b value
- Sort colors by hue, saturation, and lightness
  - We'll have to compute HSL from RGB when we seed the database
- We also need to be able to find all colors with a given name,
  and attach new names to existing colors.
  - To understand how to handle our multiple color names in a ,
  look at [Working with Arrays, Lists, and Sets](https://firebase.google.com/docs/firestore/solutions/arrays).

<details>
  <summary>Given this, what's a good structure for our database?</summary>
  <p>
  We'll model our colors as a collection, named `colors`, whose fields are:
    - `red: Number`
    - `green: Number`
    - `blue: Number`
    - `hue: Number`
    - `saturation: Number`
    - `luminance: Number`
    - `names: Object of (name -> true)`
  
  Each document represents a *unique color*, with all the different *names*
  for the color referenced there.
  </p>
</details>

### 3. Write a seed file

Write code in `fire/seed.js` to seed the database.

Just seed the RGB values at first.

Then, get the HSL seeding working. You'll need to generate hue, saturation, and luminance values for each color. You can use the [`color-functions` npm](https://www.npmjs.com/package/color-functions) to handle this for you.

### More coming soon!





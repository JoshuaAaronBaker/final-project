# Spotify-By-Me

A React application made for users who want to have a different experience with Spotify.

## Why I Built This

I made this application because I wanted to create a colorful and minimalistic experience for a Spotify like application.
I also wanted to add some extra stat tracking features which are not in the original app, because we all have fun with the end
of the year Spotify Wrapped, so why not have access all the time.

## Technologies Used

- Spotify API [https://developer.spotify.com/documentation/web-api/](https://developer.spotify.com/documentation/web-api/)
- React.js
- Webpack
- Node.js
- Express
- Axios
- HTML5
- CSS3

## Live Demo

Due to Spotify's developer agreement and quota, I will have to register your Spotify account's email address in order
for you to use the application with your own Spotify credentials. Please email me your name and the email address associated
with your Spotify account. Email: joshua.aaron.baker.dev@gmail.com

Once registered you can try the application live at [https://spotify-by-me.joshuabaker.dev](https://spotify-by-me.joshuabaker.dev)

## Features

- User can log in with Spotify.
- User can view a homepage populated with their recently played songs, playlists, Spotify reccomended playlists, and followed aritsts.
- User can select a playlist and view its contents.
- User can play a song from the selected playlist.

## Preview

https://user-images.githubusercontent.com/91937935/197603996-00c13fde-4252-4c0f-bb03-084e2ea9be6c.mp4



## Features in Development

- User can search for a song or album.
- User can view their most listened to artists.
- User can view their most listened to songs.
- User can view their most listened to genres.
- User can view their profile page.
- User can log out.

## Development

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher

### Getting Started

1. Register an application at the [Spotify Developer website](https://developer.spotify.com/dashboard/login) to get a Spotify Client ID and Client Secret.

2. On your app's overview page, click on "Edit Settings" then add a Redirect URI: https://localhost:3000/callback. Click [here](https://developer.spotify.com/documentation/general/guides/authorization/app-settings/) for Spotify's official guide.

3. Clone the repository.

   ```shell
   git clone https://github.com/JoshuaAaronBaker/spotify-by-me.git
   cd spotify-by-me
   ```

4. Install all dependencies with NPM.

    ```shell
    npm install
    ```

5. In .env.example, plug in all the corresponding values for each environment variable.

6. Make a copy of the provided .env.example file and name your copy .env.

    ```shell
    cp .env.example .env
    ```

7. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```

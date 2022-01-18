# NotesApp

This project was generated with [Angular CLI] version 13.1.2. The objective was to build a notes app, described in <https://github.com/florinpop17/app-ideas/blob/master/Projects/1-Beginner/Notes-App.md>.

## Execute

Run `npm install` to install all packages and `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. The project has also been uploaded to Vercel, access in <https://notes-app-jet.vercel.app/notes> with no need to install or download anything.

## Functions

User can create a note, edit a note and delete a note. Notes are created in an HTML form and permit the user to fill the following fields:

- Title
- Description
- To-do tasks

> User can add a task, delete a task, and set a task as done or undone.

- Color 

> User can choose a color among 8 logged colors and, by doing so, set the color theme of the note, which will be used to display both in the edit page of self and in the display within all the notes. The color also works as a filter, allowing the user to see all the notes with the same color at once.

- Favorite

> User can set a note to favorite, making it appear first in the notes display.

The form also saves and displays the date and time the user created the note, this attribute can not be changed.

## Storage

All notes created are saved in local storage, hence the user can reload the page or even close it and the notes will remain in the device. The last 10 deleted notes are stored in the trash bin, accessible on the app. User can restore a note from the trash bin and user can empty the trash bin.

## Self critics

> The quoted challenge from which this project derives had, among other things, a bonus feature that was not integrated:
>
> - User can create and edit a note in Markdown format. On save it will convert Markdown to HTML
>
> The non-completion of the above was a choice, given that, in my opinion, would give liberty to the user at an unwanted point, allowing very different note styles and displays, which could implicate an unorganized notes display, as well as an ill-favored design. In addition, could harm functions that I find convenient, such as color choosing or to-do task list.

> In the making of the project, the same was committed to this repository, but no branch was created. As my git knowledge is very shallow, I focused on the programming and practical part of the code, especially given that this is my first project in Angular and even JS-HTML-CSS. In contrast, I acknowledge the importance of branching and admit it's an area I am yet to improve.
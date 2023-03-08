~~6.03: Create a page for users to create an event (groove) with a **form for users** to enter event details. Store the event information securely in the database~~.

7.03: Implement a page for users to **view all grooves/events created by other users.** Implement pagination, so the user can view grooves across multiple pages.

8.03: ~~Implement a page for users to view a single groove/event,~~ with the **ability to join and leave the groove.**

9.03: Implement user profile pages with the ability to **upload profile pictures using Cloudinary**. **Display a list of grooves created by the user.**

- ~~Create a new page in your Next.js application for user profiles, such as **`/users/:id`**.~~
- ~~Implement a **`GET`** route in your REST API that retrieves the user data from the database and returns it as JSON.~~
- ~~Use server-side rendering to render the user profile page with the initial data from the **`GET`** request.~~
- **Add a form to the user profile page that allows users to upload a profile picture** using Cloudinary's API.
- Display a list of grooves created by the user on their profile page.

  10.03 **.Add a map** to the page showing the location of the event.

**`???`** 11.03: Implement **commenting functionality on groove pages**. Users should be able to leave comments on grooves and view comments left by others.

- Create a new table in your database to store comments, with foreign keys to link comments to the user who left them and the groove they are associated with.
- Implement a **`GET`** route in your REST API that retrieves all comments for a specific groove and returns them as JSON.
- Implement a **`POST`** route in your REST API that allows users to leave comments on grooves and stores them securely in the database.
- Add a form to the groove page that allows users to leave comments.
- Display a list of comments left on the groove page, with the ability to paginate through multiple pages.

  11.03: Implement search functionality on the grooves page. Users should be able to **filter grooves by date, time, location, and label.**

- Add search inputs to the grooves page that allow users to filter grooves by date, time, location, and label.
- Implement a **`GET`** route in your REST API that retrieves grooves based on the search criteria and returns them as JSON.
- Use server-side rendering to render the grooves page with the initial data from the **`GET`** request.
- Add pagination to the search results to allow the user to view grooves across multiple pages.

  12.03: Implement **responsive design** using pure CSS, without a library. Ensure that the application is fully functional and looks good on mobile devices.

- Use CSS media queries to create responsive styles that adjust the layout and appearance of the application based on screen size.
- Test the application on multiple devices and ensure that it looks and works well on mobile devices.
- Ensure that the application is accessible to users with disabilities by following accessibility best practices.

  13.03: Implement additional features and polish the application.

- Add any additional features that you feel are necessary or desirable, such as a password reset function, email verification, or social login.
- Test the application thoroughly to ensure that it is functional, secure, and easy to use.
- Add **dropdown menu** with js

  14.03: Write unit **tests with Jest and use Playwright** to test the user interface.

- Write Jest tests to ensure that all server-side and client-side code is working as expected.
- Use Playwright to test the user interface, making sure that all buttons, forms, and links are working correctly.
- Test the application on multiple devices and browsers to ensure that it works well on a variety of platforms.

  15.03: **Deploy** the application to a hosting provider.

- Choose a hosting provider that supports Next.js and PostgreSQL, such as Vercel or Heroku.
- Create a production build of your Next.js application.
- Set up a PostgreSQL database on your hosting provider, and migrate your database schema and data to the production database.
- Deploy your application to the hosting provider, ensuring that all necessary environment variables are set up correctly.
- Test the deployed application to ensure that it is functioning correctly and securely.
- Set up continuous integration and deployment (CI/CD) to automate the deployment process and ensure that the application is always up to date.

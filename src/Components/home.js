import React from 'react'

export default () => (
  <div className="home">
    <h1>Instructions</h1>

    <p>Welcome to my aviation checklist app! It has been created using React, React Router and Redux.</p>

    <h3>Use the aircraft checklist to</h3>
    <ul>
      <li>Assign an engineer to a task.</li>
      <li>Add a task.</li>
      <li>Remove a task.</li>
      <li>Mark a task as complete.</li>
    </ul>
    <p>
      State is managed using Redux, changes to the checklist will not be lost
      when navigating the app.
    </p>
    <h3>Use the engineer roster to</h3>
    <ul>
      <li>Add a new engineer to the roster.</li>
      <li>Remove an engineer from the roster.</li>
      <li>Mark an engineer as available / unavailable.</li>
    </ul>
    <p>
      Adding an engineer to the roster will make them available in the aircraft
      checklist.
    </p>
    <p>
      If an engineer is removed from the roster, they will no longer be
      available in the aircraft checklist.
    </p>
    <h3>Features</h3>
    <ul>
      <li>All checklist / roster changes are managed by Redux state.</li>
      <li>
        The checklist has been implemented with a higher order component (HOC).
      </li>
      <li>
        New checklists are very easy to implement by using the checklist HOC.
      </li>
      <li>Checklist items / roster engineers have unique(ish) ID numbers.</li>
      <li>Components structured with test-ability in mind.</li>
    </ul>
    <h3>Future Features</h3>
    <ul>
      <li>Add the ability to dynamically add new checklists via the UI.</li>
      <li>
        Connect a database to permanently store checklist states.
      </li>
      <li>
        Personalise checklist ownership by adding the ability to log in.
      </li>
      <li>
        Dynamically assign new checklists to the navigation bar.
      </li>
      <li>
        Configure service worker to further allow the app to cache data as a PWA.
      </li>
      <li>
        Write tests using Jest.
      </li>
      <li>
        Add a 'notes' section to checklists.
      </li>
    </ul>
  </div>
);
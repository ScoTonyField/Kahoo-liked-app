1. Most of the componenet has aria-labelledby.

2. Lots of content loader or 'loading' message are used in the system, such as loading game card on dashboard and loading questions when playing quiz. This notifies user the system status, so user will know the system is loading but not crashing.

3. When playing a quiz, if time's up, players are not able to click options; if timer is still counting down, admin is not able to advance the question. This is considered as error prevention.

4. The question/option/media are also displayed on admin's screen, so that admin is able to project their screen to monitor (e.g. in class), and answers won't show before time's up.

5. When importing game, user can preview the game information before the data is actually processed. This gives user a clear view of what will be imported.

6. If a quiz does not have a thumbnail, a default image is set and display to keep consistency.

7. If a session does not have questions or players, instead of display an empty chart or empty table which may lead to confusion (i.e. 'Is it loading?'), the system will clearly indicate that there's no palyers/questions in that session.

8. During a session, if there's only less then 5 seconds left, the timer turns to red to notify user.

9. When editing a question, question type (multiple/single choice) are automatically set according to user's selections of correct answers. Furthermore, points and time limit can only be numbers. Also, the system won't allow duplicate options (e.g. Two options with the same text). Those are considered as error prevention.

10. Image are using alt text, which is friendly to screen reader.

11. No matter admin/players are on dashboard page or quiz playing page, the system supports auto login and resume game incase users accidentally close the browser.
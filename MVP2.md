# MVP

This web app is intended to manage collaboration information within a workgroup. There are many layers in which that goal can be achieved. 
The **MVP** on its entirety can be broken down as follows:

1. **"Task-organizer"**
On the first layer, we can categorize Tasks into Projects and Categories and create new ones as well.

    1.1 *Sing-in.* Each member will be able to either sign up or log in with a logger middleware assistance.
    1.2 *Structural view.* On the first layer, the structure *Project-Category-Task* will be displayed to the user.
    1.3 *Projects.*  Different projects that workgroup can be working on must also be included.
    1.4 *Tasks categories.*  Categories to englobe all tasks must be included to easily outline project areas.
    1.5 *Tasks themselves.*  Enlisting the tasks with the above outlined structured is the ultimate goal for this first product.

2. **"Task-organizer-detailer"**
On the second layer, we can go deeper on detailing different aspects of each Task.

    2.1 *Task description and belonging.* We can decribe and link Task to specific Projects and Categories.
    2.2 *Task time length.* How long a task might take to be completed is something the workgroup should take in account when laying out the project program.
    2.3 *Task executor(s).* People in charge of either one of the tasks must be common knowledge to the whole workgroup.
    2.4 *Task status.* The task status is something the entire team should appreciate having at a hand.
    2.5 *Task dependencies.* This is refered to the new tasks that came out of other tasks development and constitute troubles that hinder the parent completion.
    2.6 *Edition.* If a Task is already defined, we will have the possibility to edit it as well.

3. **"Conversation around Tasks"**
On the third layer, we will provide interface to keep trak of what is talked and discussed around each Task.

    3.1 *Messages history.* A tracking history of the messages sent that relate to the specific Task, including information of the message creator and created at time.
    3.2 *Message creation.* A simple interface to build and send new messages.

4. **"Task-organizer-easy_display"**
The third layer should consist on developing intuitive showcasing of the whole information.

    4.1 *Member page.* Each member should be able to see all the tasks that relate to him/herself in a simple, intiuitive and editable way.
    4.2 *Tasks filterable listing.* Just as simple as a complete task list will always come in handy. That can be an extra route on the interface. It should probably include all data hold for each task.


# USED TECNOLOGIES

Team-Organizer is a SPA application (Single Page Application) using common Web tools (HTML, Javascript, CSS) and the MERN (Mongo, Express, React, Node) approach. Besides those, it will use the following tools:

1. *Libraries:*
    1.1 React

2. *Packages:*
    2.1 Node-Mailer
    2.2 Passport/Bcrypt
    2.3 Express-Session
    2.4 DotEnv

3. *Data Base management:*
    3.1 MySql-Sequelize
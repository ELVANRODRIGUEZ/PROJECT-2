# MVP

## VERSION 1

<!-- This is a web app that will manage tasks within workteams in such a way that it conveys to each member his/her own contributions to one or several projects. The projoct has the following considerations:

* It is like the anteroom for a Project Management, in which the team(s) can start outlining the Work Breakdown Structure of the projects and start defining tasks, scopes, responsibles, temptative timelines, etc.

* It will have an "Statistics" page to show in infographs the project(s) development. This might imply the usage of graphs API's.

* For now, the program will run in "sessions" so there will be teammates accounts and will be thought for just one workgroup.

* There will be an internal chat that will externalized through mail API's to extend comunications. -->

This web app is intended to manage collaboration information within a workgroup. There are many layers in which that goal can be achieved. 
The **MVP** on its entirety can be broken down as follows:

1. **"Task-organizer"**
On the first layer, at least some structure to keep the different tasks must be outlined.

    1. *Team members.*  There must be a way to specify different users or workmembers for that workgroup.
    1. *Projects.*  Different projects that workgroup can be working on must also be included.
    1. *Tasks categories.*  Categories to englobe all tasks must be included to easily outline project areas.
    1. *Tasks themselves.*  Enlisting the tasks with the above outlined structured is the ultimate goal for this first product.

2. **"Task-organizer-detailer"**
On the second layer, we can go deeper on detailing different aspects of each task.

    2. *Task time length.* How long a task might take to be completed is something the workgroup should take in account when laying out the project program.
    2. *Task executor(s).* People en charge of either one of the tasks must be common knowledge to the whole workgroup.
    2. *Task status.* The task status is something the entire team should appreciate having at a hand.
    2. *Task dependencies.* This is refered to the new tasks that came out of other tasks development and constitute troubles that hinder the parent completion.

3. **"Task-organizer-easy_display"**
The third layer should consist on developing intuitive showcasing of the whole information.

    3. *Tasks filterable listing.* Just as simple as a complete task list will always come in handy. It should probably include all data hold for each task.
    3. *Member page.* Each member should be able to see all the tasks that relate to him/herself in a simple, intiuitive and editable way.
    3. *Infographs.* It is always interesting to see data in graph form to quickly identify potential issues at a glance. Graphs containing tasks assigned per user, per project, completed, yet to complete, etc, might be the difference between a fundamental "go to" app or a "should be interestign to use" app.
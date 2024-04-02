import { Meteor } from 'meteor/meteor';
import { LinksCollection } from '/imports/api/links';
import { TasksCollection } from '/imports/api/TasksCollection';

const insertTask = taskText => TasksCollection.insert({ text: taskText });
 
Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task'
    ].forEach(insertTask)
  }
});

async function insertLink({ title, url }) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.publish('links.all', function publishLinksAll() {
  return LinksCollection.find();
})

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if (await LinksCollection.find().countAsync() === 0) {
    
    await insertLink({
      title: 'Do the Tutorial2',
      url: 'https://svelte-tutorial.meteor.com/',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }
});

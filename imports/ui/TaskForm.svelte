<script>
    import { TasksCollection } from '../api/TasksCollection';

    let newTask = '';
    console.log('qqq---');
    const handleSubmit = () => {
        // Insert a task into the collection
        console.log('newTask');
        console.log(newTask);
        TasksCollection.insert({
            text: newTask,
            createdAt: new Date(), // current time
        });

        // Clear form
        newTask = '';
    }
</script>

<form class="task-form" on:submit|preventDefault={handleSubmit}>
    <input
            type="text"
            name="text"
            placeholder="Type to add new tasks"
            bind:value={newTask}
    />
    <button type="submit">Add Task</button>
</form>
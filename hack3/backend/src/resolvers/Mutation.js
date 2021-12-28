const Mutation = {
  /**
   * Add a task
   */
  createTask: async (parent, { input }, { taskModel, pubSub }) => {
    console.log('createTask', input);
    const newTask = new taskModel(input);
    await newTask.save();
    pubSub.publish("TASK_CREATED", {
      taskCreated: newTask,
    });
    return newTask;
  },
  /**
   * Update a task's status by its id
   */
  updateTask: async (parent, { id, status }, { taskModel, pubSub }) => {
    const task = await taskModel.findOneAndUpdate(
      { id },
      {
        $set: {
          id,
          status,
        },
      },
      { returnDocument: "after" }
    );
    pubSub.publish("TASK_UPDATED", {
      taskUpdated: task,
    });
    return task;
  },
  /**
   * Delete a task by id
   */
  deleteTask: async (parent, { id }, { taskModel, pubSub }) => {
    const task = await taskModel.findOneAndDelete({ id });
    pubSub.publish("TASK_DELETED", {
      taskDeleted: id,
    });
    return id;
  },
};

export default Mutation;

const ToDoList = artifacts.require('./ToDoList.sol')

contract('ToDoList', (accounts) => {
  before(async () => {
    this.toDoList = await ToDoList.deployed()
  })

  it('deploys successfully', async () => {
    const address = await this.toDoList.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('lists task', async () => {
    const taskCount = await this.toDoList.taskCount()
    const task = await this.toDoList.tasks(taskCount)
    assert.equal(task.id.toNumber(), taskCount.toNumber())
    assert.equal(task.content, 'Demo Task')
    assert.equal(task.completed, false)
  })

  it('create task', async () => {
    const result = await this.toDoList.createTask('New Task')
    const taskCount = await this.toDoList.taskCount()
    assert.equal(taskCount, 2)
    // console.log(result)
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), taskCount.toNumber())
    assert.equal(event.content, 'New Task')
    assert.equal(event.completed, false)
  })

  it('toggles task completion', async () => {
    const result = await this.toDoList.toggleCompleted(1)
    const task = await this.toDoList.tasks(1)
    assert.equal(task.completed, true)
    // fetch event
    const event = result.logs[0].args
    assert.equal(event.id.toNumber(), 1)
    assert.equal(event.completed, true)
  })
})

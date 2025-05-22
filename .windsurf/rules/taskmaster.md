---
trigger: model_decision
description: Taskmaster MCP tools and CLI commands reference.
globs: **/*
---

# Taskmaster Tools

**Important:** Several MCP tools involve AI processing and may take up to a minute to complete.

## Task Management

### Parse PRD (`parse_prd`)
- **Description:** Parse PRD to generate initial tasks
- **Usage:** Bootstrap project from requirements
- **Notes:** Uses AI to generate tasks

### Get Tasks (`get_tasks`)
- **Description:** List tasks with status and subtasks
- **Usage:** Get project overview

### Get Next Task (`next_task`)
- **Description:** Show next available task
- **Usage:** Identify next task to work on

### Get Task Details (`get_task`)
- **Description:** Display task details by ID
- **Usage:** Review task before implementation

## Task Creation

### Add Task (`add_task`)
- **Description:** Add new task with AI structuring
- **Usage:** Add new development tasks
- **Notes:** Uses AI to structure tasks

### Add Subtask (`add_subtask`)
- **Description:** Add subtask to parent task
- **Usage:** Break down complex tasks

### Update Tasks (`update`)
- **Description:** Update multiple tasks
- **Usage:** Handle implementation changes
- **Example:** `task-master update --from='18' --prompt='Switching to React Query'`

### Update Task (`update_task`)
- **Description:** Modify specific task
- **Usage:** Update task details

### Update Subtask (`update_subtask`)
- **Description:** Add notes to subtask
- **Usage:** Log implementation details
- **Example:** `task-master update-subtask --id='15.2' --prompt='API requires header X'`

### Set Task Status (`set_task_status`)
- **Description:** Update task status
- **Usage:** Mark task progress

### Remove Task (`remove_task`)
- **Description:** Delete task/subtask
- **Usage:** Remove completed tasks
- **Notes:** Cleans up dependencies automatically

## Task Breakdown

### Expand Task (`expand_task`)
- **Description:** Break down complex task
- **Usage:** Generate implementation plan
- **Notes:** Uses AI for breakdown

### Expand All Tasks (`expand_all`)
- **Description:** Expand all pending tasks
- **Usage:** Batch task breakdown
- **Notes:** Uses complexity analysis

### Clear Subtasks (`clear_subtasks`)
- **Description:** Remove all subtasks
- **Usage:** Prepare for new breakdown

### Remove Subtask (`remove_subtask`)
- **Description:** Remove single subtask
- **Usage:** Reorganize subtasks

## Dependencies

### Add Dependency (`add_dependency`)
- **Description:** Define task dependency
- **Usage:** Set task order

### Remove Dependency (`remove_dependency`)
- **Description:** Remove task dependency
- **Usage:** Update task relationships

### Validate Dependencies (`validate_dependencies`)
- **Description:** Check dependency issues
- **Usage:** Audit task dependencies

### Fix Dependencies (`fix_dependencies`)
- **Description:** Automatically fix dependencies
- **Usage:** Clean up dependency errors

## Analysis

### Analyze Project Complexity (`analyze_project_complexity`)
- **Description:** Analyze task complexity
- **Usage:** Identify complex tasks
- **Notes:** Uses AI analysis

### View Complexity Report (`complexity_report`)
- **Description:** Display complexity analysis
- **Usage:** Review analysis results

## File Management

### Generate Task Files (`generate`)
- **Description:** Create/update task files
- **Usage:** Keep files in sync

---

For more details, see the [Development Workflow Guide](mdc:.cursor/rules/dev_workflow.mdc).
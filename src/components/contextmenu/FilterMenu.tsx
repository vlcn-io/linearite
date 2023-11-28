import { Portal } from '../Portal'
import { ReactNode, useState } from 'react'
import { ContextMenuTrigger } from '@firefox-devtools/react-contextmenu'
import { BsCheck2 } from 'react-icons/bs'
import { Menu } from './menu'
import { PriorityOptions, PriorityType, StatusOptions, StatusType } from '../../types/issue'
// import { querySQL, sql } from '@livestore/livestore'
// import { useQuery, useStore } from '@livestore/livestore/react'
import { FilterState } from '../../domain/schema'

interface Props {
  id: string
  button: ReactNode
  className?: string
}

// const filterState$ = querySQL<{ value: string }>((_) => sql`SELECT * FROM app_state WHERE "key" = 'filter_state'`)
//   .getFirstRow({
//     defaultValue: { value: '{}' },
//   })
//   .pipe<FilterState>((row) => JSON.parse(row.value))

function FilterMenu({ id, button, className }: Props) {
  const [keyword, setKeyword] = useState('')
  // const filterState = useQuery(filterState$)
  // const { store } = useStore()
  const filterState = {} as FilterState;

  let priorities = PriorityOptions
  if (keyword !== '') {
    const normalizedKeyword = keyword.toLowerCase().trim()
    priorities = priorities.filter(
      ([_icon, _priority, label]) => (label as string).toLowerCase().indexOf(normalizedKeyword) !== -1,
    )
  }

  let statuses = StatusOptions
  if (keyword !== '') {
    const normalizedKeyword = keyword.toLowerCase().trim()
    statuses = statuses.filter(([_icon, _status, label]) => label.toLowerCase().indexOf(normalizedKeyword) !== -1)
  }

  const priorityOptions = priorities.map(([Icon, priority, label], idx) => {
    return (
      <Menu.Item key={`priority-${idx}`} onClick={() => handlePrioritySelect(priority)}>
        <Icon className="mr-3" />
        <span>{label}</span>
        {filterState.priority?.includes(priority) && <BsCheck2 className="ml-auto" />}
      </Menu.Item>
    )
  })

  const statusOptions = statuses.map(([Icon, status, label], idx) => {
    return (
      <Menu.Item key={`status-${idx}`} onClick={() => handleStatusSelect(status)}>
        <Icon className="mr-3" />
        <span>{label}</span>
        {filterState.status?.includes(status) && <BsCheck2 className="ml-auto" />}
      </Menu.Item>
    )
  })

  const handlePrioritySelect = (priority: PriorityType) => {
    setKeyword('')
    const newPriority = filterState.priority || []
    if (newPriority.includes(priority)) {
      newPriority.splice(newPriority.indexOf(priority), 1)
    } else {
      newPriority.push(priority)
    }
    // store.applyEvent('upsertAppAtom', {
    //   key: 'filter_state',
    //   value: JSON.stringify({
    //     ...filterState,
    //     priority: newPriority,
    //   }),
    // })
  }

  const handleStatusSelect = (status: StatusType) => {
    setKeyword('')
    const newStatus = filterState.status || []
    if (newStatus.includes(status)) {
      newStatus.splice(newStatus.indexOf(status), 1)
    } else {
      newStatus.push(status)
    }
    // store.applyEvent('upsertAppAtom', {
    //   key: 'filter_state',
    //   value: JSON.stringify({
    //     ...filterState,
    //     status: newStatus,
    //   }),
    // })
  }

  return (
    <>
      <ContextMenuTrigger id={id} holdToDisplay={1}>
        {button}
      </ContextMenuTrigger>

      <Portal>
        <Menu
          id={id}
          size="normal"
          filterKeyword={false}
          className={className}
          searchPlaceholder="Filter by..."
          onKeywordChange={(kw) => setKeyword(kw)}
        >
          {priorityOptions && <Menu.Header>Priority</Menu.Header>}
          {priorityOptions}
          {priorityOptions && statusOptions && <Menu.Divider />}
          {statusOptions && <Menu.Header>Status</Menu.Header>}
          {statusOptions}
        </Menu>
      </Portal>
    </>
  )
}

export default FilterMenu

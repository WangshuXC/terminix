import { useState, useMemo } from 'react'
import type { FileItem } from '@shared/types'
import {
  IconFolder,
  IconFile,
  IconLink,
  IconLoader2,
  IconAlertCircle,
  IconChevronUp,
  IconChevronDown
} from '@tabler/icons-react'

type SortField = 'name' | 'modifiedTime' | 'size'
type SortOrder = 'asc' | 'desc'

interface FileListProps {
  files: FileItem[]
  loading: boolean
  error: string | null
  selectedFiles: Set<string>
  onFileDoubleClick: (file: FileItem) => void
  onFileSelect: (file: FileItem, selected: boolean) => void
  onContextMenu: (event: React.MouseEvent, file: FileItem | null) => void
}

export function FileList({
  files,
  loading,
  error,
  selectedFiles,
  onFileDoubleClick,
  onFileSelect,
  onContextMenu
}: FileListProps) {
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
  }

  const sortedFiles = useMemo(() => {
    return [...files].sort((a, b) => {
      // 目录始终在前
      if (a.type === 'directory' && b.type !== 'directory') return -1
      if (a.type !== 'directory' && b.type === 'directory') return 1

      let comparison = 0
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'modifiedTime':
          comparison = a.modifiedTime.getTime() - b.modifiedTime.getTime()
          break
        case 'size':
          comparison = a.size - b.size
          break
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }, [files, sortField, sortOrder])

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortOrder === 'asc' ? (
      <IconChevronUp size={14} className="inline" />
    ) : (
      <IconChevronDown size={14} className="inline" />
    )
  }
  const getFileIcon = (file: FileItem) => {
    switch (file.type) {
      case 'directory':
        return <IconFolder size={20} className="text-blue-400" />
      case 'symlink':
        return <IconLink size={20} className="text-purple-500" />
      default:
        return <IconFile size={20} className="text-neutral-400" />
    }
  }

  const getFileKind = (file: FileItem) => {
    switch (file.type) {
      case 'directory':
        return 'folder'
      case 'symlink':
        return 'symlink'
      default: {
        const name = file.name
        const lastDotIndex = name.lastIndexOf('.')
        if (lastDotIndex <= 0) return 'file'
        const ext = name.slice(lastDotIndex + 1).toLowerCase()
        if (!ext) return 'file'
        return ext
      }
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'kB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    let hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    return `${month}/${day}/${year}, ${hours}:${minutes} ${ampm}`
  }

  const formatPermissions = (file: FileItem) => {
    const { permissions } = file
    let result = file.type === 'directory' ? 'd' : '-'

    result += permissions.owner.read ? 'r' : '-'
    result += permissions.owner.write ? 'w' : '-'
    result += permissions.owner.execute ? 'x' : '-'
    result += permissions.group.read ? 'r' : '-'
    result += permissions.group.write ? 'w' : '-'
    result += permissions.group.execute ? 'x' : '-'
    result += permissions.others.read ? 'r' : '-'
    result += permissions.others.write ? 'w' : '-'
    result += permissions.others.execute ? 'x' : '-'

    return result
  }

  if (loading) {
    return (
      <div className="flex h-full select-none items-center justify-center">
        <div className="flex items-center gap-2 text-neutral-500">
          <IconLoader2 size={20} className="animate-spin" />
          <span>Loading files...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full select-none items-center justify-center">
        <div className="flex items-center gap-2 text-red-500">
          <IconAlertCircle size={20} />
          <span>{error}</span>
        </div>
      </div>
    )
  }

  if (files.length === 0) {
    return (
      <div className="flex h-full select-none items-center justify-center">
        <span className="text-neutral-500">No files found</span>
      </div>
    )
  }

  return (
    <div className="h-full select-none overflow-auto">
      <table className="w-full text-sm">
        <thead className="sticky top-0 z-10 bg-neutral-50 dark:bg-neutral-800">
          <tr className="border-b border-neutral-200 dark:border-neutral-700">
            <th
              className="cursor-pointer px-3 py-2 font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center justify-between">
                <span>Name</span>
                {renderSortIcon('name')}
              </div>
            </th>
            <th
              className="cursor-pointer px-3 py-2 font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
              onClick={() => handleSort('modifiedTime')}
            >
              <div className="flex items-center justify-between">
                <span>Date Modified</span>
                {renderSortIcon('modifiedTime')}
              </div>
            </th>
            <th
              className="cursor-pointer px-3 py-2 font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700"
              onClick={() => handleSort('size')}
            >
              <div className="flex items-center justify-between">
                <span>Size</span>
                {renderSortIcon('size')}
              </div>
            </th>
            <th className="px-3 py-2 text-left font-medium text-neutral-700 dark:text-neutral-300">
              Kind
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedFiles.map((file) => {
            const isSelected = selectedFiles.has(file.path)
            const rowClass = isSelected
              ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
              : 'hover:bg-blue-50 dark:hover:bg-blue-900/20'

            return (
              <tr
                key={file.path}
                className={`cursor-pointer ${rowClass}`}
                onClick={(e) => {
                  e.preventDefault()
                  onFileSelect(file, !isSelected)
                }}
                onDoubleClick={() => onFileDoubleClick(file)}
                onContextMenu={(e) => onContextMenu(e, file)}
              >
                <td className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    {getFileIcon(file)}
                    <div className="flex flex-col">
                      <span
                        className={`text-xs ${file.isHidden ? 'text-neutral-400 dark:text-neutral-500' : ''}`}
                      >
                        {file.name}
                      </span>
                      <span
                        className={`font-mono text-[10px] ${isSelected ? 'text-blue-200' : 'text-neutral-400 dark:text-neutral-500'}`}
                      >
                        {formatPermissions(file)}
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className={`px-3 py-2 text-xs ${isSelected ? 'text-blue-100' : 'text-neutral-600 dark:text-neutral-400'}`}
                >
                  {formatDate(file.modifiedTime)}
                </td>
                <td
                  className={`px-3 py-2 text-xs ${isSelected ? 'text-blue-100' : 'text-neutral-600 dark:text-neutral-400'}`}
                >
                  {file.type === 'directory' ? '-' : formatFileSize(file.size)}
                </td>
                <td
                  className={`px-3 py-2 text-xs ${isSelected ? 'text-blue-100' : 'text-neutral-600 dark:text-neutral-400'}`}
                >
                  {getFileKind(file)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

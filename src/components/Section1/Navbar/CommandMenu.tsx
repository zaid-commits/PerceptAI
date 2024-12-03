import { useNavigate } from 'react-router-dom'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { File, Hash } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
}

interface CommandMenuProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  notes: Note[]
  tags: string[]
}

export function CommandMenu({ isOpen, setIsOpen, notes, tags }: CommandMenuProps) {
  const navigate = useNavigate()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-0">
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Notes">
              {notes.map((note) => (
                <CommandItem
                  key={note.id}
                  onSelect={() => {
                    navigate(`/note/${note.id}`)
                    setIsOpen(false)
                  }}
                >
                  <File className="mr-2 h-4 w-4" />
                  {note.title}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup heading="Tags">
              {tags.map((tag) => (
                <CommandItem
                  key={tag}
                  onSelect={() => {
                    navigate(`/?tag=${tag}`)
                    setIsOpen(false)
                  }}
                >
                  <Hash className="mr-2 h-4 w-4" />
                  {tag}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
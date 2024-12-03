import { useNavigate } from 'react-router-dom'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { File, Hash, Home, User } from "lucide-react"

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
                        <CommandGroup heading="Navigation">
                            <CommandItem
                                onSelect={() => {
                                    navigate(`/home`)
                                    setIsOpen(false)
                                }}
                            >
                                <Home className="mr-2 h-4 w-4" />
                                Home
                            </CommandItem>
                            <CommandItem
                                onSelect={() => {
                                    window.open(`https://zedfr.me`, '_blank')
                                    setIsOpen(false)
                                }}
                            >
                                <User className="mr-2 h-4 w-4" />
                                Developer of the project
                            </CommandItem>



                            <CommandItem
                                onSelect={() => {
                                    navigate(`/settings`)
                                    setIsOpen(false)
                                }}
                            >
                                <File className="mr-2 h-4 w-4" />
                                Settings
                            </CommandItem>
                            <CommandItem
                                onSelect={() => {
                                    navigate(`/profile`)
                                    setIsOpen(false)
                                }}
                            >
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </CommandItem>
                            <CommandItem
                                onSelect={() => {
                                    navigate(`/projects`)
                                    setIsOpen(false)
                                }}
                            >
                                <File className="mr-2 h-4 w-4" />
                                Projects
                            </CommandItem>
                            <CommandItem
                                onSelect={() => {
                                    navigate(`/community`)
                                    setIsOpen(false)
                                }}
                            >
                                <User className="mr-2 h-4 w-4" />
                                Community
                            </CommandItem>
                            <CommandItem
                                onSelect={() => {
                                    navigate(`/contact`)
                                    setIsOpen(false)
                                }}
                            >
                                <User className="mr-2 h-4 w-4" />
                                Contact
                            </CommandItem>
                            <CommandItem
                                onSelect={() => {
                                    window.open(`https://github.com/zaid-commits/perceptai`, '_blank')
                                    setIsOpen(false)
                                }}
                            >
                                <File className="mr-2 h-4 w-4" />
                                GitHub Repository
                            </CommandItem>
                            <CommandItem
                                onSelect={() => {
                                    navigate(`/resources`)
                                    setIsOpen(false)
                                }}
                            >
                                <File className="mr-2 h-4 w-4" />
                                Resources
                            </CommandItem>
                            <CommandItem
                                onSelect={() => {
                                    navigate(`/dashboard`)
                                    setIsOpen(false)
                                }}
                            >
                                <Home className="mr-2 h-4 w-4" />
                                Dashboard
                            </CommandItem>

                        </CommandGroup>
                    </CommandList>
                </Command>
            </DialogContent>
        </Dialog>
    )
}
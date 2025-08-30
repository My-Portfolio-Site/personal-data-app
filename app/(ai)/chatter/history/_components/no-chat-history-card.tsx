import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import NewChatButton from "../../chat/[chatId]/_components/new-chat-button"


export default function NoChatHistoryCard() {
  return (
    <Card id='noChatHistory' className="bg-transparent max-w-fit shadow-none border-0 self-center">
      <CardHeader>
        <CardTitle>No Chat History</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          You don't have any chat history yet.
        </CardDescription>
      </CardContent>
      <CardFooter>
        <CardAction>
          <NewChatButton isFull={true} />
        </CardAction>
      </CardFooter>
    </Card>
  )
}

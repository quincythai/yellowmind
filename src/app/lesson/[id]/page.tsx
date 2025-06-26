import { LessonPage } from "@/components/lesson-page"

export default function Lesson({ params }: { params: { id: string } }) {
  return <LessonPage lessonId={params.id} />
}

import AssignedUserInterface from './assignedUser.model';

export default interface CourseInterface {
    id: number,
    title: String,
    description: String,
    rating: number
    assignedUsers?: AssignedUserInterface[]
}
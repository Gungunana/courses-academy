import AssignedUserInterface from './assignedUser.model';
import UserScoreInterface from './user.score.model';

export default interface CourseInterface {
    id: number,
    title: String,
    description: String,
    rating: number
    assignedUsers?: AssignedUserInterface[],
    userScores:  UserScoreInterface[]
}
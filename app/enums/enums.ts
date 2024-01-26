enum ProofType {
    Image = "Image",
    Link = "Link",
    Text = "Text"
}

enum UserAction {
    Create = "create",
    Update = "update",
    Delete = "delete"
}

enum RoutineStatus {
    InProgress = 'in-progress',
    Failed = "failed",
    Completed = "completed",
    Deleted = "deleted"
}

enum UpdateInterval {
    EveryTwentyFourHours = "Every Twenty Four Hours",
}

enum StartTime {
    Now = "Now"
}

enum SettingKey {
    Password = "password",
    Avatar = "avatar",
    Theme = "theme"
}

export { ProofType, UserAction, RoutineStatus, UpdateInterval, StartTime, SettingKey };

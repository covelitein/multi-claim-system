export type TeamMemberRole =
  | "Billing Manager"
  | "Claims Specialist"
  | "Facility Admin"
  | "Staff Nurse"
  | "Administrator";

export type TeamMember = {
  id: string;
  firstName: string;
  lastName: string;
  initials: string;
  image: string;
  role: TeamMemberRole | string;
  email: string;
  facility: string;
  status: "active" | "inactive";
  lastActive: string;
};

/** Billing workspace. Team never lists people from other facilities. */
export const CURRENT_FACILITY = "Sunrise Assisted Living";

export function colleaguesAtFacility(
  members: TeamMember[],
  facility = CURRENT_FACILITY,
) {
  return members.filter((member) => member.facility === facility);
}

/** The Team menu is for a shared facility, not a solo billing manager. */
export function teamSectionRelevant(
  members: TeamMember[] = TEAM_DATA.members,
  facility = CURRENT_FACILITY,
) {
  return colleaguesAtFacility(members, facility).length > 1;
}

export type TeamPageData = {
  facility: string;
  members: TeamMember[];
  relevant: boolean;
};

export const TEAM_DATA: { members: TeamMember[] } = {
  members: [
    {
      id: "t1",
      firstName: "Janet",
      lastName: "Morrison",
      initials: "JM",
      image: "https://i.pravatar.cc/80?img=49",
      role: "Billing Manager",
      email: "jmorrison@rewardcare.com",
      facility: "Sunrise Assisted Living",
      status: "active",
      lastActive: "2024-07-03",
    },
    {
      id: "t2",
      firstName: "Marcus",
      lastName: "Thompson",
      initials: "MT",
      image: "https://i.pravatar.cc/80?img=68",
      role: "Claims Specialist",
      email: "mthompson@rewardcare.com",
      facility: "Oakview SNF",
      status: "active",
      lastActive: "2024-07-03",
    },
    {
      id: "t3",
      firstName: "Diana",
      lastName: "Reyes",
      initials: "DR",
      image: "https://i.pravatar.cc/80?img=26",
      role: "Facility Admin",
      email: "dreyes@rewardcare.com",
      facility: "Maple Ridge Care",
      status: "active",
      lastActive: "2024-07-02",
    },
    {
      id: "t4",
      firstName: "Alan",
      lastName: "Foster",
      initials: "AF",
      image: "https://i.pravatar.cc/80?img=59",
      role: "Claims Specialist",
      email: "afoster@rewardcare.com",
      facility: "Sunrise Assisted Living",
      status: "active",
      lastActive: "2024-07-03",
    },
    {
      id: "t5",
      firstName: "Karen",
      lastName: "Wu",
      initials: "KW",
      image: "https://i.pravatar.cc/80?img=9",
      role: "Administrator",
      email: "kwu@rewardcare.com",
      facility: "All Facilities",
      status: "active",
      lastActive: "2024-07-03",
    },
    {
      id: "t6",
      firstName: "Patricia",
      lastName: "Williams",
      initials: "PW",
      image: "https://i.pravatar.cc/80?img=43",
      role: "Staff Nurse",
      email: "pwilliams@rewardcare.com",
      facility: "Oakview SNF",
      status: "inactive",
      lastActive: "2024-06-15",
    },
    {
      id: "t7",
      firstName: "David",
      lastName: "Kim",
      initials: "DK",
      image: "https://i.pravatar.cc/80?img=14",
      role: "Claims Specialist",
      email: "dkim@rewardcare.com",
      facility: "Maple Ridge Care",
      status: "active",
      lastActive: "2024-07-01",
    },
  ],
};

export async function fetchTeam(): Promise<TeamPageData> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const members = colleaguesAtFacility(TEAM_DATA.members);
  return {
    facility: CURRENT_FACILITY,
    members,
    relevant: members.length > 1,
  };
}

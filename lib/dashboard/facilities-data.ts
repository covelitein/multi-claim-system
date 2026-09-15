export type FacilityType = "ALF" | "SNF" | "Agency" | "Other";

export type Facility = {
  id: string;
  name: string;
  type: FacilityType;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  activeResidents: number;
  openClaims: number;
  contactName: string;
  contactEmail: string;
  status: "active" | "inactive";
};

export type FacilitiesPageData = {
  facilities: Facility[];
};

export const FACILITIES_DATA: FacilitiesPageData = {
  facilities: [
    {
      id: "f1",
      name: "Sunrise Assisted Living",
      type: "ALF",
      address: "1200 Wellness Blvd",
      city: "Austin",
      state: "TX",
      zip: "78701",
      phone: "(512) 555-0100",
      activeResidents: 34,
      openClaims: 56,
      contactName: "Janet Morrison",
      contactEmail: "jmorrison@sunriseal.com",
      status: "active",
    },
    {
      id: "f2",
      name: "Oakview Skilled Nursing Facility",
      type: "SNF",
      address: "4500 Oak Park Dr",
      city: "Dallas",
      state: "TX",
      zip: "75201",
      phone: "(214) 555-0200",
      activeResidents: 28,
      openClaims: 42,
      contactName: "Marcus Thompson",
      contactEmail: "mthompson@oakviewsnf.com",
      status: "active",
    },
    {
      id: "f3",
      name: "Maple Ridge Care Center",
      type: "ALF",
      address: "780 Maple Ridge Ln",
      city: "Houston",
      state: "TX",
      zip: "77002",
      phone: "(713) 555-0300",
      activeResidents: 24,
      openClaims: 38,
      contactName: "Diana Reyes",
      contactEmail: "dreyes@mapleridge.com",
      status: "active",
    },
    {
      id: "f4",
      name: "Harbor Home Health Agency",
      type: "Agency",
      address: "220 Harbor Way",
      city: "San Antonio",
      state: "TX",
      zip: "78205",
      phone: "(210) 555-0400",
      activeResidents: 0,
      openClaims: 6,
      contactName: "Alan Foster",
      contactEmail: "afoster@harborhh.com",
      status: "active",
    },
    {
      id: "f5",
      name: "Pineview Senior Living",
      type: "ALF",
      address: "950 Pineview Circle",
      city: "Fort Worth",
      state: "TX",
      zip: "76102",
      phone: "(817) 555-0500",
      activeResidents: 0,
      openClaims: 0,
      contactName: "Karen Wu",
      contactEmail: "kwu@pineviewsl.com",
      status: "inactive",
    },
  ],
};

export async function fetchFacilities(): Promise<FacilitiesPageData> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return FACILITIES_DATA;
}

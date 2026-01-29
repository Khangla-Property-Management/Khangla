"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { Plus } from "lucide-react";
import { Calendars } from "@/components/owner-calendar/calendars";
import { DatePicker } from "@/components/owner-calendar/date-picker";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { FileText, CreditCard, Bell, BadgeDollarSign } from "lucide-react";

const COLORS = {
  primary: "#547794", // rented blocks, buttons
  bg: "#F6F3EE", // app background
  panel: "#E0E0E0", // building body
  muted: "#C2C9CD", // roof, accents
  white: "#FFFFFF", // free blocks
};

type Unit = { id: string; rented: boolean };

const mockUnits: Unit[] = [
  // 3 floors x 4 units (2 columns)
  // Top floor
  { id: "F3-L1", rented: true },
  { id: "F3-R1", rented: true },
  { id: "F3-L2", rented: true },
  { id: "F3-R2", rented: false },
  // Middle floor
  { id: "F2-L1", rented: true },
  { id: "F2-R1", rented: true },
  { id: "F2-L2", rented: false },
  { id: "F2-R2", rented: true },
  // Bottom floor
  { id: "F1-L1", rented: true },
  { id: "F1-R1", rented: true },
  { id: "F1-L2", rented: true },
  { id: "F1-R2", rented: true },
];

type Tenant = {
  unitId: string;
  apartment: string;
  name?: string;
  phone?: string;
  enteredAt?: string;
  photo?: string;
  description?: string;
  rent?: { amount: number; paid: boolean };
  water?: { amount: number; paid: boolean };
  status: "RENTED" | "VACANT";
};

// Example per-unit details (customize freely)
const tenants: Record<string, Tenant> = {
  // ===== FLOOR 1 =====
  "F1-L1": {
    unitId: "F1-L1",
    apartment: "CR13",
    name: "Sonam Dorji",
    phone: "17000000",
    enteredAt: "1st July 2018",
    photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    description: "Quiet tenant, pays on time.",
    rent: { amount: 10000, paid: true },
    water: { amount: 3000, paid: true },
    status: "RENTED",
  },

  "F1-R1": {
    unitId: "F1-R1",
    apartment: "CR14",
    name: "Kinley Wangmo",
    phone: "17123456",
    enteredAt: "15th Feb 2020",
    photo: "https://images.unsplash.com/photo-1527980965258-0f0b416303d1",
    description: "Finance officer, long-term lease.",
    rent: { amount: 9500, paid: true },
    water: { amount: 2800, paid: false },
    status: "RENTED",
  },

  "F1-L2": {
    unitId: "F1-L2",
    apartment: "CR15",
    name: "Tashi",
    phone: "17222222",
    enteredAt: "10th Apr 2021",
    photo: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
    description: "Student, punctual payments.",
    rent: { amount: 8000, paid: false },
    water: { amount: 2500, paid: true },
    status: "RENTED",
  },

  "F1-R2": {
    unitId: "F1-R2",
    apartment: "CR16",
    name: "Pema Choden",
    phone: "17888888",
    enteredAt: "3rd Jan 2019",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    description: "Government employee.",
    rent: { amount: 9000, paid: true },
    water: { amount: 2600, paid: true },
    status: "RENTED",
  },

  // ===== FLOOR 2 =====
  "F2-L1": {
    unitId: "F2-L1",
    apartment: "CR19",
    name: "Dorji Wangchuk",
    phone: "17654321",
    enteredAt: "12th Aug 2020",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    description: "Runs small business.",
    rent: { amount: 11000, paid: true },
    water: { amount: 3100, paid: true },
    status: "RENTED",
  },

  "F2-R1": {
    unitId: "F2-R1",
    apartment: "CR20",
    name: "Tshering Lhamo",
    phone: "17999999",
    enteredAt: "5th May 2022",
    photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    description: "IT professional, neat tenant.",
    rent: { amount: 10500, paid: false },
    water: { amount: 2900, paid: false },
    status: "RENTED",
  },

  "F2-L2": {
    unitId: "F2-L2",
    apartment: "CR21",
    status: "VACANT",
  },

  "F2-R2": {
    unitId: "F2-R2",
    apartment: "CR22",
    name: "Ugyen Tobgay",
    phone: "17111111",
    enteredAt: "18th Nov 2017",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    description: "Old tenant, very reliable.",
    rent: { amount: 9800, paid: true },
    water: { amount: 2700, paid: true },
    status: "RENTED",
  },

  // ===== FLOOR 3 =====
  "F3-L1": {
    unitId: "F3-L1",
    apartment: "CR25",
    name: "Karma Yeshi",
    phone: "17444444",
    enteredAt: "9th Sept 2021",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    description: "Freelancer, short-term lease.",
    rent: { amount: 8500, paid: true },
    water: { amount: 2400, paid: true },
    status: "RENTED",
  },

  "F3-R1": {
    unitId: "F3-R1",
    apartment: "CR26",
    name: "Dechen Wangmo",
    phone: "17333333",
    enteredAt: "1st Mar 2023",
    photo: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7",
    description: "New tenant, cooperative.",
    rent: { amount: 9000, paid: false },
    water: { amount: 2600, paid: false },
    status: "RENTED",
  },

  "F3-L2": {
    unitId: "F3-L2",
    apartment: "CR27",
    name: "Nima Dorji",
    phone: "17555555",
    enteredAt: "20th June 2019",
    photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    description: "Teacher, long-term stay.",
    rent: { amount: 9200, paid: true },
    water: { amount: 2800, paid: true },
    status: "RENTED",
  },

  "F3-R2": {
    unitId: "F3-R2",
    apartment: "CR28",
    status: "VACANT",
  },
};

export default function OwnerPage() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const router = useRouter();
  // Replace hover with click selection
  const [selectedUnitId, setSelectedUnitId] = React.useState<string | null>(
    null
  );

  // Auth modal state
  const [authOpen, setAuthOpen] = React.useState(false);
  const [authContext, setAuthContext] = React.useState<string>("");

  const openAuth = (ctx: string) => {
    setAuthContext(ctx);
    setAuthOpen(true);
  };

  // navigate to billing page without auth
  const handleActionClick = (title: string) => {
    if (title === "Payment & Billing") {
      router.push("/owner/billing");
      return;
    }
    openAuth(title);
  };

  React.useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const rentedCount = mockUnits.filter((u) => u.rented).length;
  const vacantCount = mockUnits.length - rentedCount;

  const actionCards = [
    {
      key: "Documents",
      title: "Documents",
      subtitle: "View lease agreements, permits and legal files.",
      Icon: FileText,
    },
    {
      key: "Payment & Billing",
      title: "Payment & Billing",
      subtitle: "Review transaction history and balances.",
      Icon: CreditCard,
    },
    {
      key: "Notifications",
      title: "Notifications",
      subtitle: "Check important history and alerts.",
      Icon: Bell,
    },
  ];

  // Modal state for quick tenant view
  const [tenantModalOpen, setTenantModalOpen] = React.useState(false);
  const [tenantModalData, setTenantModalData] = React.useState<{
    name: string;
    room: string;
    phone: string;
    email: string;
    rent: string;
    leaseStart: string;
    leaseEnd: string;
    status: string;
  } | null>(null);

  return (
    <div
      style={{
        ...styles.app,
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      {/* Left sidebar */}
      <aside
        style={{
          ...styles.sidebar,
          width: isMobile ? "100%" : 180,
          padding: isMobile ? "8px 10px" : "14px 10px",
        }}
      >
        <div
          style={{
            ...styles.pillTitle,
            padding: isMobile ? "6px 12px" : "5px 10px",
            marginBottom: isMobile ? 10 : 6,
            borderRadius: 14,
            fontSize: isMobile ? 14 : 13,
          }}
        >
          Lower Motithang
        </div>
        <div
          style={{
            ...styles.pillTitle,
            padding: isMobile ? "6px 12px" : "5px 10px",
            borderRadius: 14,
            fontSize: isMobile ? 14 : 13,
          }}
        >
          House No.202
        </div>

        <div style={{ height: isMobile ? 12 : 16 }} />

        {/* Card-style actions */}
        <div style={styles.cardGrid}>
          {actionCards.map(({ key, title, subtitle, Icon }) => (
            <button
              key={key}
              style={styles.cardBtn}
              onClick={() => handleActionClick(title)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.12)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = styles.cardBtn
                  .boxShadow as string;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={styles.cardIconWrap}>
                <Icon size={18} color={COLORS.primary} />
              </div>
              <div style={styles.cardTextWrap}>
                <div style={styles.cardTitle}>{title}</div>
                <div style={styles.cardSubtitle}>{subtitle}</div>
              </div>
            </button>
          ))}

          {/* Sale house as outlined pill with icon + short sentence */}
          <button
            style={styles.cardBtn}
            onClick={() => openAuth("Sell this property")}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 18px rgba(0,0,0,0.12)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = styles.cardBtn
                .boxShadow as string;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={styles.cardIconWrap}>
              <BadgeDollarSign size={18} color={COLORS.primary} />
            </div>
            <div style={styles.cardTextWrap}>
              <div style={styles.cardTitle}>Sell this property</div>
              <div style={styles.cardSubtitle}>List your house now</div>
            </div>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          ...styles.main,
          padding: isMobile ? 10 : 12,
        }}
      >
        {/* Mobile menu button (fixed top-right) */}
        {isMobile && (
          <button
            aria-label="Open calendar"
            style={{
              ...styles.mobileMenuBtn,
              position: "fixed",
              top: 10,
              right: 10,
              zIndex: 900,
              padding: "8px 10px",
              borderRadius: 10,
            }}
            onClick={() => setCalendarOpen(true)}
          >
            <span style={{ ...styles.burgerLine, width: 18 }} />
            <span style={{ ...styles.burgerLine, width: 18 }} />
            <span style={{ ...styles.burgerLine, width: 18 }} />
          </button>
        )}

        {/* Row */}
        <div
          style={{
            ...styles.contentRow,
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 12 : 12,
          }}
        >
          {/* Building */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                ...styles.buildingWrap,
                width: isMobile
                  ? "92vw"
                  : isTablet
                  ? "min(520px, 92%)"
                  : "min(460px, 92%)",
                margin: isMobile
                  ? "14px auto 12px"
                  : isTablet
                  ? "28px auto 16px"
                  : "32px auto 18px",
                marginLeft: isMobile ? 0 : 80,
              }}
            >
              {/* Roof */}
              <div
                style={{
                  ...styles.roofTop,
                  top: isMobile ? -18 : -28,
                  borderLeft: isMobile
                    ? "12px solid transparent"
                    : "18px solid transparent",
                  borderRight: isMobile
                    ? "12px solid transparent"
                    : "18px solid transparent",
                  borderBottom: isMobile
                    ? `20px solid ${COLORS.muted}`
                    : `26px solid ${COLORS.muted}`,
                  width: isMobile ? "96%" : "104%",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.10))",
                }}
              />
              <div
                style={{
                  ...styles.roofCap,
                  top: isMobile ? -20 : -30,
                  width: isMobile ? "70%" : "72%",
                  height: 2,
                }}
              />

              {/* Body */}
              <div
                style={{
                  ...styles.buildingBody,
                  padding: isMobile
                    ? "10px"
                    : isTablet
                    ? "14px 14px 16px"
                    : "14px 14px 18px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.10)",
                }}
              >
                {/* Floors */}
                <div
                  style={{
                    ...styles.floors,
                    gap: isMobile ? 8 : isTablet ? 10 : 12,
                  }}
                >
                  {chunk(mockUnits, 4).map((floorUnits, floorIdx) => (
                    <div
                      key={`floor-${floorIdx}`}
                      style={{
                        ...styles.floorRow,
                        gap: isMobile ? 8 : isTablet ? 10 : 12,
                      }}
                    >
                      {chunk(floorUnits, 2).map((colUnits, colIdx) => (
                        <div
                          key={`col-${floorIdx}-${colIdx}`}
                          style={{
                            ...styles.column,
                            gap: isMobile ? 8 : isTablet ? 10 : 12,
                          }}
                        >
                          {colUnits.map((unit) => {
                            const rentInfo = tenants[unit.id]?.rent;
                            const rentPaid = rentInfo?.paid === true;
                            return (
                              <div
                                key={unit.id}
                                title={
                                  `Unit ${unit.id}` +
                                  (unit.rented && rentInfo
                                    ? ` — Rent ${rentPaid ? "Paid" : "Due"}`
                                    : "")
                                }
                                onClick={() =>
                                  setSelectedUnitId((prev) =>
                                    prev === unit.id ? null : unit.id
                                  )
                                }
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    "scale(1.03)";
                                  e.currentTarget.style.boxShadow =
                                    "0 4px 10px rgba(0,0,0,0.18)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform = "scale(1)";
                                  e.currentTarget.style.boxShadow = unit.rented
                                    ? "0 1px 3px rgba(0,0,0,0.12)"
                                    : `inset 0 0 0 1px ${COLORS.muted}40, 0 1px 3px rgba(0,0,0,0.08)`;
                                }}
                                style={{
                                  ...styles.unitBlock,
                                  height: isMobile ? 38 : isTablet ? 44 : 48,
                                  borderRadius: 5,
                                  background: unit.rented
                                    ? COLORS.primary
                                    : COLORS.white,
                                  cursor: "pointer",
                                  transition: "all 160ms ease",
                                  boxShadow: unit.rented
                                    ? "0 1px 3px rgba(0,0,0,0.12)"
                                    : `inset 0 0 0 1px ${COLORS.muted}40, 0 1px 3px rgba(0,0,0,0.08)`,
                                }}
                              >
                                {/* Centered label for rented (blue) units */}
                                {unit.rented && (
                                  <span style={styles.unitLabel}>ALL</span>
                                )}

                                {/* Rent status badge for rented units */}
                                {unit.rented && rentInfo && (
                                  <span
                                    style={{
                                      ...styles.unitBadge,
                                      ...(rentPaid
                                        ? styles.badgePaid
                                        : styles.badgeDue),
                                    }}
                                  >
                                    {rentPaid ? "Paid" : "Due"}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Inline legend only */}
            <div style={styles.belowRow}>
              <div style={styles.inlineLegend}>
                <span style={styles.legendSquare} />
                <span style={styles.inlineLegendText}>
                  Rented: {rentedCount} Vacant: {vacantCount}
                </span>
              </div>

              {/* Professional details card preview */}
              {selectedUnitId && (
                <div style={styles.detailsCard}>
                  {(() => {
                    // derive status from mockUnits: blue = rented, white = vacant
                    const isRented = !!mockUnits.find(
                      (u) => u.id === selectedUnitId
                    )?.rented;
                    const t = tenants[selectedUnitId] || {
                      unitId: selectedUnitId,
                      apartment: selectedUnitId,
                      status: isRented ? "RENTED" : "VACANT",
                    };
                    const floor = selectedUnitId.slice(1, 2);
                    const side = selectedUnitId.includes("L")
                      ? "left"
                      : "right";
                    return (
                      <>
                        <div style={styles.detailsHeader}>
                          <div style={styles.photoWrap}>
                            <img
                              src={
                                t.photo ||
                                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop"
                              }
                              alt="Unit photo"
                              style={styles.photoImg}
                            />
                          </div>
                          <div style={styles.titleWrap}>
                            <div style={styles.titleMain}>
                              Apartment: {t.apartment} • Unit {t.unitId}
                            </div>
                            <div style={styles.titleSub}>
                              Floor: {floor} • Side: {side}
                            </div>
                          </div>
                          {/* badge uses derived status */}
                          <div
                            style={
                              isRented ? styles.badgeRented : styles.badgeVacant
                            }
                          >
                            {isRented ? "RENTED" : "VACANT"}
                          </div>
                        </div>

                        <div style={styles.infoGrid}>
                          <div style={styles.infoCol}>
                            <div style={styles.label}>Renter</div>
                            <div style={styles.value}>{t.name || "—"}</div>
                            <div style={styles.label}>Phone</div>
                            <div style={styles.value}>{t.phone || "—"}</div>
                            <div style={styles.label}>Date of entry</div>
                            <div style={styles.value}>{t.enteredAt || "—"}</div>
                            <div style={styles.label}>Description</div>
                            <div style={styles.value}>
                              {t.description || "—"}
                            </div>
                          </div>
                          <div style={styles.infoCol}>
                            <div style={styles.label}>Remarks</div>
                            <div style={styles.remarkRow}>
                              <span>
                                Rent:{" "}
                                {t.rent?.amount
                                  ? t.rent.amount.toLocaleString()
                                  : "—"}
                              </span>
                              <span
                                style={
                                  t.rent?.paid
                                    ? styles.paidText
                                    : styles.unpaidText
                                }
                              >
                                {t.rent?.paid ? "Paid" : "Unpaid"}
                              </span>
                            </div>
                            <div style={styles.remarkRow}>
                              <span>
                                Water bill{" "}
                                {t.water?.amount
                                  ? t.water.amount.toLocaleString()
                                  : ""}
                              </span>
                              <span
                                style={
                                  t.water?.paid
                                    ? styles.paidText
                                    : styles.unpaidText
                                }
                              >
                                {t.water?.paid ? "Paid" : "Unpaid"}
                              </span>
                            </div>
                            {/* Show Post button only for VACANT units */}
                            {!isRented && (
                              <button
                                style={styles.viewBtn}
                                onClick={() =>
                                  router.push(
                                    `/owner/post?unitId=${selectedUnitId}&floor=${floor}`
                                  )
                                }
                              >
                                Post
                              </button>
                            )}
                            {/* Quick view modal */}
                            {isRented && (
                              <button
                                style={styles.viewBtn}
                                onClick={() => {
                                  setTenantModalData({
                                    name: t.name || "—",
                                    room: t.unitId,
                                    phone: t.phone || "—",
                                    email: "—",
                                    rent: t.rent?.amount
                                      ? `Nu. ${t.rent.amount.toLocaleString()}`
                                      : "—",
                                    leaseStart: t.enteredAt || "—",
                                    leaseEnd: "—",
                                    status: "Active",
                                  });
                                  setTenantModalOpen(true);
                                }}
                              >
                                Quick view
                              </button>
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>

          {/* Right calendar sidebar (hidden on mobile) */}
          {!isMobile && (
            <div
              style={{
                ...styles.sidebarRightWrap,
                width: isTablet ? 280 : 280,
                minWidth: isTablet ? 280 : 280,
                borderRadius: 10,
              }}
            >
              <SidebarRight />
            </div>
          )}
        </div>

        {/* Mobile calendar overlay */}
        {isMobile && calendarOpen && (
          <div
            style={{
              ...styles.calendarOverlay,
              background: "rgba(0,0,0,0.22)",
            }}
            onClick={() => setCalendarOpen(false)}
          >
            <div
              style={{
                ...styles.calendarSheet,
                maxWidth: 320,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                style={{
                  ...styles.sheetHeader,
                  padding: 8,
                }}
              >
                <span style={{ color: COLORS.primary, fontWeight: 600 }}>
                  Calendar
                </span>
                <button
                  style={{
                    ...styles.sheetCloseBtn,
                    padding: "3px 6px",
                    borderRadius: 6,
                  }}
                  onClick={() => setCalendarOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div style={{ padding: 6 }}>
                <SidebarGroup className="px-0">
                  <SidebarGroupContent>
                    <Calendar className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[30px]" />
                  </SidebarGroupContent>
                </SidebarGroup>
              </div>
            </div>
          </div>
        )}

        {/* Auth modal */}
        {authOpen && (
          <AuthModal
            title={`Sign in to continue${
              authContext ? ` — ${authContext}` : ""
            }`}
            onClose={() => setAuthOpen(false)}
          />
        )}

        {/* Tenant quick view modal */}
        {tenantModalOpen && tenantModalData && (
          <TenantDetailsModal
            open={tenantModalOpen}
            setOpen={setTenantModalOpen}
            tenant={tenantModalData}
          />
        )}
      </main>
    </div>
  );
}

// Shadcn/ui right sidebar with DatePicker + Calendars
export function SidebarRight(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky top-0 hidden h-svh border-l lg:flex"
      {...props}
    >
      <SidebarHeader className="border-sidebar-border h-16 border-b">
        <NavUser
          user={{
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
        <Calendars
          calendars={[
            { name: "My Calendars", items: ["Personal", "Work", "Family"] },
            { name: "Favorites", items: ["Holidays", "Birthdays"] },
            { name: "Other", items: ["Travel", "Reminders", "Deadlines"] },
          ]}
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Plus />
              <span>New Calendar</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

// Simple professional auth modal
function AuthModal({ title, onClose }: { title: string; onClose: () => void }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submit = async () => {
    if (!email || !password) return;
    setLoading(true);
    // TODO: integrate your real auth flow here
    setTimeout(() => {
      setLoading(false);
      alert("Signed in (demo). Replace with your auth integration.");
      onClose();
    }, 700);
  };

  return (
    <div
      style={styles.authOverlay}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div style={styles.authDialog} onClick={(e) => e.stopPropagation()}>
        <div style={styles.authHeader}>
          <div style={styles.authTitle}>{title}</div>
          <button style={styles.authClose} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div style={styles.authBody}>
          <div style={styles.authRow}>
            <label style={styles.authLabel}>Email</label>
            <input
              style={styles.authInput}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={styles.authRow}>
            <label style={styles.authLabel}>Password</label>
            <input
              style={styles.authInput}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div style={styles.authActions}>
            <button
              style={styles.authPrimaryBtn}
              onClick={submit}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Continue"}
            </button>
            <button
              style={styles.authSecondaryBtn}
              onClick={() => alert("Sign-up flow (demo).")}
            >
              Create account
            </button>
          </div>

          <div style={styles.authDivider}>
            <span>or</span>
          </div>

          <button
            style={styles.socialBtn}
            onClick={() => alert("Social login (demo).")}
          >
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    display: "flex",
    minHeight: "100vh",
    background: COLORS.bg,
    color: COLORS.primary,
  },
  sidebar: {
    width: 200, // was 240
    padding: "18px 12px", // tighter
  },
  pillTitle: {
    background: COLORS.bg,
    border: `1px solid ${COLORS.muted}`,
    color: COLORS.primary,
    borderRadius: 18,
    padding: "6px 12px",
    marginBottom: 6,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    fontWeight: 500,
    letterSpacing: 0.2,
  },
  sidebarBtn: {
    width: "100%",
    textAlign: "left",
    background: "rgba(30, 89, 134, 0.58)", // requested color
    border: "1px solid rgba(84, 119, 148, 0.46)",
    color: "#FFFFFF", // light text to match pill look
    borderRadius: 12,
    padding: "6px 12px",
    marginBottom: 12,
    fontSize: 12,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    cursor: "pointer",
    transition: "background 120ms ease, box-shadow 120ms ease",
  },
  main: {
    flex: 1,
    position: "relative",
    padding: 16, // was 24
  },
  contentRow: {
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
  },
  mobileTopBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 8,
  },
  mobileMenuBtn: {
    background: COLORS.bg,
    border: `1px solid ${COLORS.muted}`,
    borderRadius: 10,
    padding: "8px 10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    display: "inline-flex",
    flexDirection: "column",
    gap: 3,
    cursor: "pointer",
  },
  burgerLine: {
    width: 18,
    height: 2,
    background: COLORS.primary,
    borderRadius: 2,
  },
  buildingWrap: {
    position: "relative",
    width: "min(520px, 92%)",
    margin: "48px auto 24px",
    marginRight: "auto",
    marginLeft: 100,
  },
  roofTop: {
    position: "absolute",
    top: -28,
    left: "50%",
    transform: "translateX(-50%)",
    width: "104%",
    height: 0,
    borderLeft: "18px solid transparent",
    borderRight: "18px solid transparent",
    borderBottom: `26px solid ${COLORS.muted}`,
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.10))",
  },
  roofCap: {
    position: "absolute",
    top: -30,
    left: "50%",
    transform: "translateX(-50%)",
    width: "72%",
    height: 2,
    background: COLORS.muted,
    borderRadius: 2,
    opacity: 0.9,
  },
  buildingBody: {
    background: COLORS.panel,
    borderRadius: 8,
    padding: "14px 14px 18px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.10)",
  },
  floors: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  floorRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    flex: 1,
  },
  unitBlock: {
    height: 48,
    borderRadius: 6,
    cursor: "pointer",
    transition: "transform 160ms ease, box-shadow 160ms ease",
    outline: "none",
    position: "relative",
  },
  // Centered label inside blue box
  unitLabel: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 11,
    fontWeight: 700,
    color: "#FFFFFF",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    pointerEvents: "none",
    textShadow: "0 1px 2px rgba(0,0,0,0.25)",
  },
  // Small badge in top-right of unit block
  unitBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    padding: "2px 6px",
    borderRadius: 999,
    fontSize: 10,
    fontWeight: 700,
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
    border: `1px solid ${COLORS.muted}`,
    background: "#FFFFFF",
    color: "#6B7C88",
  },
  badgePaid: {
    background: "#22c55e",
    color: "#FFFFFF",
    borderColor: "#22c55e",
  },
  badgeDue: {
    background: "#ef4444",
    color: "#FFFFFF",
    borderColor: "#ef4444",
  },

  // Details card styles
  detailsCard: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: "10px 12px",
    marginLeft: "auto",
    background: "#FFFFFF",
    border: `1px solid ${COLORS.muted}`,
    borderRadius: 12,
    boxShadow: "0 6px 12px rgba(0,0,0,0.10)",
    maxWidth: 520,
    width: "100%",
  },
  detailsHeader: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  photoWrap: {
    width: 80,
    height: 60,
    borderRadius: 10,
    overflow: "hidden",
    border: `1px solid ${COLORS.muted}`,
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    flexShrink: 0,
    background: "#f9fafb",
  },
  photoImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  titleWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    flex: 1,
  },
  titleMain: { fontWeight: 700, color: COLORS.primary, fontSize: 14 },
  titleSub: { fontSize: 12, color: "#6B7C88" },
  badgeRented: {
    padding: "6px 10px",
    borderRadius: 999,
    background: COLORS.primary, // blue for rented
    color: "#fff",
    fontWeight: 700,
    fontSize: 12,
    boxShadow: "0 3px 8px rgba(84,119,148,0.35)",
  },
  badgeVacant: {
    padding: "6px 10px",
    borderRadius: 999,
    background: "#FFFFFF", // white for vacant
    color: "#6B7C88",
    border: `1px solid ${COLORS.muted}`,
    fontWeight: 700,
    fontSize: 12,
    boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: 12,
  },
  infoCol: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    background: COLORS.bg,
    borderRadius: 10,
    padding: "10px",
    border: `1px solid ${COLORS.muted}`,
  },
  label: { fontSize: 12, color: "#6B7C88" },
  value: { fontSize: 13, color: COLORS.primary, fontWeight: 600 },

  remarkRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 10px",
    borderRadius: 8,
    background: "#ECEDEE",
    marginTop: 4,
  },
  paidText: { color: "#22c55e", fontWeight: 700 },
  unpaidText: { color: "#ef4444", fontWeight: 700 },

  viewBtn: {
    marginTop: 10,
    background: COLORS.primary,
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 10px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },

  // Inline row under the building
  belowRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "0 8px",
    marginTop: 6,
  },

  // Inline legend: colored square + text
  inlineLegend: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    color: COLORS.primary,
  },
  legendSquare: {
    width: 18,
    height: 18,
    borderRadius: 4,
    background: COLORS.primary,
    boxShadow: "0 1px 2px rgba(0,0,0,0.10)",
  },
  inlineLegendText: {
    fontSize: 13,
    color: COLORS.primary,
    opacity: 0.9,
  },
  sidebarRightWrap: {
    width: 280,
    minWidth: 280,
    background: COLORS.bg,
    border: `1px solid ${COLORS.muted}`,
    borderRadius: 10,
    boxShadow: "0 6px 12px rgba(0,0,0,0.10)",
    padding: 0,
    color: COLORS.primary,
    overflow: "hidden",
  },
  calendarOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.22)",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "stretch",
    zIndex: 1000,
  },
  calendarSheet: {
    width: "85vw",
    maxWidth: 320,
    background: COLORS.bg,
    borderLeft: `1px solid ${COLORS.muted}`,
    boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
    display: "flex",
    flexDirection: "column",
  },
  sheetHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 8,
    borderBottom: `1px solid ${COLORS.muted}`,
    background: "#FFFFFF",
  },
  sheetCloseBtn: {
    background: COLORS.bg,
    border: `1px solid ${COLORS.muted}`,
    color: COLORS.primary,
    borderRadius: 6,
    padding: "3px 6px",
    cursor: "pointer",
  },

  // Grid holding the three action cards
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 10,
    marginBottom: 10,
  },

  // match image: soft white card, muted border, rounded, subtle shadow
  cardBtn: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    background: "#FFFFFF",
    border: `1px solid ${COLORS.muted}`,
    borderRadius: 14,
    padding: "12px 14px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    cursor: "pointer",
    textAlign: "left",
    transition: "box-shadow 160ms ease, transform 160ms ease",
    width: "100%",
  },

  // icon container: white pill with thin border and faint shadow
  cardIconWrap: {
    background: "#FFFFFF",
    border: `1px solid ${COLORS.muted}`,
    borderRadius: 10,
    width: 30,
    height: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1.5px 4px rgba(0,0,0,0.08)",
    flexShrink: 0,
  },

  // text stack and hierarchy
  cardTextWrap: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  cardTitle: {
    color: COLORS.primary,
    fontWeight: 700,
    fontSize: 15,
  },
  cardSubtitle: {
    color: "#6B7C88",
    fontSize: 12.5,
    lineHeight: 1.4,
  },

  // New outlined pill style for the "Sale house" button
  saleBtn: {
    width: "100%",
    background: "#FFFFFF",
    color: COLORS.primary,
    border: `2px solid ${COLORS.primary}`,
    borderRadius: 18,
    padding: "10px 14px",
    fontSize: 13,
    fontWeight: 600,
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition:
      "background 140ms ease, color 140ms ease, box-shadow 140ms ease, border-color 140ms ease",
    // support icon + text inline
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  // Auth modal styles
  authOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1100,
    padding: 16,
  },
  authDialog: {
    width: "100%",
    maxWidth: 420,
    background: "#FFFFFF",
    border: `1px solid ${COLORS.muted}`,
    borderRadius: 14,
    boxShadow: "0 20px 60px rgba(0,0,0,0.20)",
    overflow: "hidden",
  },
  authHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 14px",
    borderBottom: `1px solid ${COLORS.muted}`,
    background: COLORS.bg,
  },
  authTitle: { fontWeight: 700, color: COLORS.primary },
  authClose: {
    background: "#fff",
    border: `1px solid ${COLORS.muted}`,
    color: COLORS.primary,
    borderRadius: 8,
    padding: "4px 8px",
    cursor: "pointer",
  },
  authBody: { padding: 14, display: "flex", flexDirection: "column", gap: 10 },
  authRow: { display: "flex", flexDirection: "column", gap: 6 },
  authLabel: { fontSize: 12, color: "#6B7C88" },
  authInput: {
    height: 38,
    borderRadius: 10,
    border: `1px solid ${COLORS.muted}`,
    padding: "0 10px",
    background: "#fff",
    color: COLORS.primary,
  },
  authActions: {
    display: "flex",
    gap: 10,
    marginTop: 4,
  },
  authPrimaryBtn: {
    flex: 1,
    background: COLORS.primary,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
  },
  authSecondaryBtn: {
    background: "#fff",
    color: COLORS.primary,
    border: `1px solid ${COLORS.muted}`,
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
  authDivider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#6B7C88",
    fontSize: 12,
    marginTop: 4,
  },
  socialBtn: {
    width: "100%",
    background: "#fff",
    color: COLORS.primary,
    border: `1px solid ${COLORS.muted}`,
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
};

// Tailwind-styled modal from your snippet, inlined here
function TenantDetailsModal({
  open,
  setOpen,
  tenant,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  tenant: {
    name: string;
    room: string;
    phone: string;
    email: string;
    rent: string;
    leaseStart: string;
    leaseEnd: string;
    status: string;
  };
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold">Tenant Details</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 hover:text-black text-lg"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-3 text-sm">
          <Detail label="Name" value={tenant.name} />
          <Detail label="Room" value={tenant.room} />
          <Detail label="Phone" value={tenant.phone} />
          <Detail label="Email" value={tenant.email} />
          <Detail label="Monthly Rent" value={tenant.rent} />
          <Detail label="Lease Start" value={tenant.leaseStart} />
          <Detail label="Lease End" value={tenant.leaseEnd} />

          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
              {tenant.status}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100"
          >
            Close
          </button>
          <button className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

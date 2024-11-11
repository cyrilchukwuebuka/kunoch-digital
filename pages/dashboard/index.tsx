import Alert, { Alert as AlertType } from "@/components/Auxilliary/Alert";
import { columns } from "@/components/Table/columns";
import { DataTable } from "@/components/Table/data-table";
import { User } from "@/types/user";
import { faker } from "@faker-js/faker";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { generateData } from "@/lib/mock-data";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [alert, setAlert] = useState<AlertType>({
    title: "",
    variant: "warn",
    onClose: () => closeAlert(),
    active: false,
  });

  const closeAlert = () => {
    setAlert({ ...alert, active: false });
  };

  useEffect(() => {
    const users = generateData();
    setUsers(users);
  }, []);

  return (
    <div className="overflow-hidden">
      <Head>
        <title className="uppercase">PRELAUNCH - KUNOCH DIGITAL</title>
      </Head>

      <main className="dark:bg-black dark:text-gray-200">
        <ScrollArea className="flex flex-col min-h-[60vh] md:min-h-[70vh] p-3 md:p-10 whitespace-nowrap rounded-md border">
          <DataTable columns={columns} data={users} />
        </ScrollArea>

        <span className="z-30 fixed top-3 right-3">
          <Alert alert={alert} />
        </span>
      </main>
    </div>
  );
};

export default Dashboard;

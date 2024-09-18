import React from "react";
import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import "@testing-library/jest-dom/vitest";

import AdminTable from "../../src/modules/adminDashboard/AdminTable";
import { MemoryRouter } from "react-router-dom";

const adminRecords = [
  {
    lastName: "MAZOYER",
    firstName: "Laurent",
    email: "test@test.fr",
    isSuperAdmin: true,
  },
];

const handleDelete = (
  id: number | undefined,
  isSuperAdmin: boolean,
  email: string
) => {
  return;
};

describe("AdminTable", () => {
  it("should disable the delete button if loged in admin is current row", () => {
    const currentAdminEmail = "test@test.fr";

    render(
      // Need MemoryRouter because using Link component
      <MemoryRouter>
        <AdminTable
          currentAdminEmail={currentAdminEmail}
          adminRecords={adminRecords}
          handleDelete={handleDelete}
        />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /supprimer/i });
    expect(button).toBeDisabled();
  });

  it("should not disable the delete button if loged in admin is current row", () => {
    const currentAdminEmail = "test2@test.fr";

    render(
      // Need MemoryRouter because using Link component
      <MemoryRouter>
        <AdminTable
          currentAdminEmail={currentAdminEmail}
          adminRecords={adminRecords}
          handleDelete={handleDelete}
        />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /supprimer/i });
    expect(button).not.toBeDisabled();
  });
});

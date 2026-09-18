import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test/renderWithProviders";
import { ReportWizard } from "./ReportWizard";

async function goToNextStep(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByRole("button", { name: "Continuer" }));
}

describe("formulaire de signalement", () => {
  it("ouvre sur la première étape du parcours", () => {
    renderWithProviders(<ReportWizard />);

    expect(screen.getByText("Étape 1 sur 4")).toBeInTheDocument();
    expect(screen.getByText("Qui fait ce signalement ?")).toBeInTheDocument();
  });

  it("refuse de passer l’étape « situation » sans description", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ReportWizard />);

    await goToNextStep(user);
    await goToNextStep(user);

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Décrivez la situation en quelques mots pour continuer.",
    );
    expect(screen.getByText("Étape 2 sur 4")).toBeInTheDocument();
  });

  it("demande le consentement avant l’envoi", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ReportWizard />);

    await goToNextStep(user);
    await user.type(
      screen.getByLabelText("Décrivez la situation avec vos mots"),
      "Ma voisine est en difficulté.",
    );
    await goToNextStep(user);
    await goToNextStep(user);
    await user.click(screen.getByRole("button", { name: "Envoyer le signalement" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Cochez cette case pour envoyer votre signalement.",
    );
  });

  it("remet un code de suivi une fois le signalement envoyé", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ReportWizard />);

    await goToNextStep(user);
    await user.type(
      screen.getByLabelText("Décrivez la situation avec vos mots"),
      "Ma voisine est en difficulté.",
    );
    await goToNextStep(user);
    await goToNextStep(user);
    await user.click(
      screen.getByRole("checkbox", { name: /J’accepte que ces informations soient traitées/ }),
    );
    await user.click(screen.getByRole("button", { name: "Envoyer le signalement" }));

    expect(await screen.findByText("Votre signalement a bien été reçu")).toBeInTheDocument();
    expect(screen.getByText(/^[A-Z0-9]{3}-[A-Z0-9]{3}$/)).toBeInTheDocument();
  });

  it("n’affiche l’alerte secours que si un danger immédiat est signalé", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ReportWizard />);

    await goToNextStep(user);
    const dangerGroup = screen.getByRole("group", {
      name: "Quelqu’un est-il en danger en ce moment ?",
    });

    expect(
      screen.queryByText("Appelez d’abord les secours si vous le pouvez"),
    ).not.toBeInTheDocument();

    await user.click(within(dangerGroup).getByRole("button", { name: "Oui" }));

    expect(
      await screen.findByText("Appelez d’abord les secours si vous le pouvez"),
    ).toBeInTheDocument();
  });
});

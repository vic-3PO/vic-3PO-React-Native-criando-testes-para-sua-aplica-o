import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import {
  ENVIADO,
  NAO_ENVIADO,
} from "../../../../src/negocio/constantes/estadosLance";

import EnviaLance from "../../../../src/telas/Leilao/componentes/EnviaLance";

describe("EnviaLance", () => {
  it("deve enviar o lance e exibir o estado ENVIADO", async () => {
    const enviaLance = jest.fn(
      () => new Promise((resolve) => resolve(ENVIADO))
    );

    const { getByPlaceholderText, getByA11yHint, getByText } = render(
      <EnviaLance enviaLance={enviaLance} cor="blue" />
    );

    const input = getByPlaceholderText("R$");
    const botao = getByA11yHint("Enviar lance", { ignoreElement: true });

    fireEvent.changeText(input, "10");
    fireEvent.press(botao);

    expect(enviaLance).toHaveBeenCalledWith("10");
    await waitFor(() => {
      expect(getByText(ENVIADO)).toBeTruthy();
    });

    expect(() => getByText(NAO_ENVIADO)).toThrow();
  });

  it("deve enviar o lance e exibir o estado NAO_ENVIADO", async () => {
    const enviaLance = jest.fn(
      () => new Promise((resolve) => resolve(NAO_ENVIADO))
    );

    const { getByPlaceholderText, getByA11yHint, getByText } = render(
      <EnviaLance enviaLance={enviaLance} cor="blue" />
    );

    const input = getByPlaceholderText("R$");
    const botao = getByA11yHint("Enviar lance", { ignoreElement: true });

    fireEvent.changeText(input, "10");
    fireEvent.press(botao);

    expect(enviaLance).toHaveBeenCalledWith("10");
    await waitFor(() => {
      expect(getByText(NAO_ENVIADO)).toBeTruthy();
    });

    expect(() => getByText(ENVIADO)).toThrow();
  });
});

// App.test.tsx
import { act, fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { fetchGithubUsers } from "./services/github";

jest.mock("./services/github");
const mockFetch = fetchGithubUsers as jest.Mock;

beforeEach(() => {
  jest.useFakeTimers();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("App", () => {
  it("fetches and displays users when typing (debounced)", async () => {
    mockFetch.mockResolvedValueOnce([
      { id: 1, login: "octocat", avatar_url: "https://avatar.com" },
    ]);

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/search github users/i), {
      target: { value: "octocat" },
    });

    // advance debounce inside act
    await act(async () => {
      jest.advanceTimersByTime(350);
    });

    // Now it should call fetchGithubUsers
    expect(mockFetch).toHaveBeenCalledWith(
      "octocat",
      expect.any(AbortSignal)
    );

    // User should be displayed
    expect(await screen.findByText("octocat")).toBeInTheDocument();
  });

  it("shows 'No results' when API returns empty", async () => {
    mockFetch.mockResolvedValueOnce([]);

    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/search github users/i), {
      target: { value: "ghost" },
    });

    await act(async () => {
      jest.advanceTimersByTime(350);
    });

    expect(
      await screen.findByText(/no results\. try a different search\./i)
    ).toBeInTheDocument();
  });

  it("handles API rate limit", async () => {
    const error = new Error("rate_limit");
    mockFetch.mockRejectedValueOnce(error);

    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/search github users/i), {
      target: { value: "limit" },
    });

    await act(async () => {
      jest.advanceTimersByTime(350);
    });

    expect(
      await screen.findByText(/rate limit exceeded/i)
    ).toBeInTheDocument();
  });

  it("ignores rapid typing and only fetches final query", async () => {
    mockFetch.mockResolvedValueOnce([
      { id: 2, login: "finaluser", avatar_url: "https://avatar.com" },
    ]);

    render(<App />);
    const input = screen.getByPlaceholderText(/search github users/i);

    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.change(input, { target: { value: "ab" } });
    fireEvent.change(input, { target: { value: "abc" } });

    await act(async () => {
      jest.advanceTimersByTime(350);
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      "abc",
      expect.any(AbortSignal)
    );

    expect(await screen.findByText("finaluser")).toBeInTheDocument();
  });
});

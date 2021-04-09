import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let showUserProfileUseCase: ShowUserProfileUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe("Show User Profile", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(
      inMemoryUsersRepository
    );
  });
  it("should not be able to show a non-existing user profile", async () => {
    await expect(
      showUserProfileUseCase.execute("invalid_user_id")
    ).rejects.toEqual(new ShowUserProfileError());
  });
  it("should be able to show the user profile", async () => {
    const createdNewUser = await inMemoryUsersRepository.create({
      name: "XuxadaSilva",
      email: "xuxa@silva.com",
      password: "123456",
    });
    const userCreatedProfile = await showUserProfileUseCase.execute(
      createdNewUser.id as string
    );
    expect(userCreatedProfile).toHaveProperty("id");
    expect(userCreatedProfile).toEqual(createdNewUser);
  });
});
import { InMemoryBoardsRepository } from '../repository/inMemory/InMemoryBoards.repository.js';
import { Board } from './Board.js';
import { BoardsService } from './Boards.service.js';

describe('UsersRegistrationRepository |', () => {
  const testBoard = new Board({
    boardName: 'Wroclaw',
    mapCoordinates: { latitude: 51.88569995139321, longitude: 17.02390643626451 },
    accessType: 'public',
    adminId: '507f191e810c19729de860ea',
    description: 'sample description',
    avatarUrl: 'https://firebasestorage.googleapis.com/sampleavatarurl',
  });
  const testBoardWithoutContent = new Board({});

  test('when correct board is being added, then body is returned', async () => {
    //Given
    const inMemoryBoardsRepository = new InMemoryBoardsRepository();
    const boardsService = new BoardsService(inMemoryBoardsRepository);

    //When
    const returnedBody = await boardsService.addBoard(testBoard);

    //Then
    expect(returnedBody).toEqual(testBoard);
  });

  test('when board data is not valid, then error is throw', async () => {
    //Given
    const inMemoryBoardsRepository = new InMemoryBoardsRepository();
    const boardsService = new BoardsService(inMemoryBoardsRepository);

    //When
    const addBoardWithoutContent = async () => {
      await boardsService.addBoard(testBoardWithoutContent);
    };

    //Then
    await expect(addBoardWithoutContent).rejects.toThrowError();
  });
});

//TODO test dla tworzenia boarda o tej samej nazwie i sprawdzenie odleglosci

describe('Boards service | add new annoucements', () => {
  test('when no data are sent then error is thrown', async () => {
    //Given
    const inMemoryBoardsRepository = new InMemoryBoardsRepository();
    const boardsService = new BoardsService(inMemoryBoardsRepository);

    //When
    const addWithoutParameters = async () => {
      await boardsService.addNewAnnouncement();

      //Then
      await expect(addWithoutParameters).rejects.toThrowError();
    };

    test('when board with asked id is not existing then error is thrown');
    test('when board already contains announcement with specified id then error is thrown');
    test('when parameters are correct and board exists then announcements are added');
  });
});

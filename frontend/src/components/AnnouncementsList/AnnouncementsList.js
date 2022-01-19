import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Announcement from '../Announcement/Announcement';
import PropTypes from 'prop-types';

const AnnouncementsList = ({ boardsIds, announcementsNumber, showBoardNames }) => {
  const { data, isLoading, isError } = useQuery('boardsList', async () => {
    return await fetch('/boards').then((response) => response.json());
  });

  const [announcements, setAnnouncemensts] = useState([]);
  const [windowSize, setWindowSize] = useState('');

  useEffect(() => {
    const resizeHandler = () => setWindowSize(window.innerWidth);
    window.addEventListener('resize', resizeHandler);

    return () => {
      window.removeEventListener(resizeHandler);
    };
  }, []);

  useEffect(() => {
    if (!!data && !!data.boards) {
      console.log(data.boards.filter(({ boardId }) => boardsIds.includes(boardId)));
      const announcementsToShow = data.boards
        .filter(({ boardId }) => boardsIds.includes(boardId))
        .reduce((acc, { announcements }) => {
          acc.push(...announcements);
          return acc;
        }, [])
        .sort((a, b) => b.date - a.date)
        .slice(0, announcementsNumber);
      console.log(announcementsToShow);
      setAnnouncemensts(announcementsToShow);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div data-testid={'announcementsList'}>
      <div>
        {announcements.map((announcement) => {
          return (
            <Announcement
              key={announcement.announcementId}
              announcement={announcement}
              descriptionLength={windowSize > 470 ? 150 : 50}
              showBoard={showBoardNames}
            />
          );
        })}
      </div>
    </div>
  );
};

AnnouncementsList.propTypes = {
  boardsIds: PropTypes.array.isRequired,
  announcementsNumber: PropTypes.number,
  showBoardNames: PropTypes.bool,
};

export default AnnouncementsList;

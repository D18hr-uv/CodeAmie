import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const CodeHistory = ({ onLoadCode }) => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    setLoading(true);
    const q = query(
      collection(db, 'codeSnippets'),
      where('userId', '==', currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const snippetsData = [];
      querySnapshot.forEach((doc) => {
        snippetsData.push({ id: doc.id, ...doc.data() });
      });
      setSnippets(snippetsData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching snippets:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (loading) {
    return (
        <div className="code-history-container loading">
             <AiOutlineLoading3Quarters className="loading-icon" />
             <p>Loading History...</p>
        </div>
    );
  }

  return (
    <div className="code-history-container">
      <h4>Code History</h4>
      <div className="history-list-wrapper">
        {snippets.length === 0 ? (
            <p className="empty-history">You haven&apos;t saved any code yet. Use the "Save Code" button to keep a snippet!</p>
        ) : (
            <ul className="history-list">
            {snippets.map((snippet) => (
                <li key={snippet.id} className="history-item">
                <button onClick={() => onLoadCode(snippet.code, snippet.language)} title={`Load this ${snippet.language} snippet`}>
                    <span className="history-language">{snippet.language}</span>
                    <code className="history-preview">{snippet.code.substring(0, 60)}...</code>
                    <span className="history-date">
                    {snippet.createdAt?.toDate().toLocaleDateString()}
                    </span>
                </button>
                </li>
            ))}
            </ul>
        )}
      </div>
    </div>
  );
};


CodeHistory.propTypes = {
  onLoadCode: PropTypes.func.isRequired,
};

export default CodeHistory;

import styles from '../styles/components/BackOfficeBoardModal.module.css';

import { useEffect, useState, type FormEventHandler, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CancleButton, InsertButton } from './ButtonComponent';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { Board, BoardRoleCode, MemberRoleCode } from '../layouts/BackOfficeLayout';

type ModalPortalProps = {
    children: ReactNode;
}

const ModalPortal = ({children} : ModalPortalProps) => {
    const modalRoot = document.getElementById('modal-root');
    if(!modalRoot) return;

    return createPortal(children, modalRoot);
}

type insertModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchData: () => void;
}

type editModalProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    fetchData: () => void;
    data: any;
}

export const InsertBoardModal = ({isOpen, setIsOpen, fetchData} : insertModalProps) => {
    if (!isOpen) return;

    const {accessToken} = useAuth();

    const [code, setCode] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [comment, setComment] = useState<string>("");

    const onClickSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/board`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                code: code,
                name: name,
                comment: comment,
            })
        })
        .then(res => {
            if(!res.ok) throw res;
            return res.json();
        })
        .then(res => {
            alert('게시판이 생성되었습니다.');
            setIsOpen(false);
            fetchData();
        })
        .catch((res :Response)=> {
            if (res.status === 409) {
                alert('중복된 코드입니다.');
            }
        })
    }
    
    return (
        <>
            <ModalPortal>
                <div className={styles.overlay}>
                    <div className={styles.modal}>

                        <X className={styles.exit} color='grey' size={24} strokeWidth={1} onClick={() => setIsOpen(false)}/>

                        <div className={`${styles.modalHeader}`}>
                            <h2>게시판 추가</h2>
                            <p>새로운 게시판을 추가합니다.</p>
                        </div>

                        <div className={`${styles.modalBody}`}>
                            <form className={styles.modalForm} onSubmit={onClickSubmit}>
                                <div className={`${styles.formFields}`}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='code'>코드</label>
                                        <input type="text" id="code" name="code" value={code} maxLength={16} required onChange={(e) => setCode(e.target.value)}/>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='name'>이름</label>
                                        <input type="text" id="name" name="name" value={name} maxLength={16} onChange={(e) => setName(e.target.value)}/>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='comment'>설명</label>
                                        <input type="text" id="comment" name="comment" value={comment} maxLength={32} onChange={(e) => setComment(e.target.value)}/>
                                    </div>
                                </div>

                                <div className={`${styles.buttonGroup}`}>
                                    <CancleButton svg={null} value='취소' type='button' onClick={() => setIsOpen(false)}></CancleButton>
                                    <InsertButton svg={null} value='추가' type='submit' onClick={() => {}}></InsertButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </ModalPortal>
        </>
    )
}

export const EditBoardModal = ({isOpen, setIsOpen, fetchData, data} : editModalProps) => {
    if (!isOpen) return;

    const {accessToken} = useAuth();

    const [code, setCode] = useState<string>(data.categoryCode);
    const [name, setName] = useState<string>(data.categoryName);
    const [comment, setComment] = useState<string>(data.comment);

    const onClickSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/board/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                code: code,
                name: name,
                comment: comment,
            })
        })
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            alert('게시판이 수정되었습니다.');
            setIsOpen(false);
            fetchData();
        })
        .catch(err => console.error(err));
    }
    
    return (
        <>
            <ModalPortal>
                <div className={styles.overlay}>
                    <div className={styles.modal}>

                        <X className={styles.exit} color='grey' size={24} strokeWidth={1} onClick={() => setIsOpen(false)}/>

                        <div className={`${styles.modalHeader}`}>
                            <h2>게시판 수정</h2>
                            <p>게시판을 수정합니다.</p>
                        </div>

                        <div className={`${styles.modalBody}`}>
                            <form className={styles.modalForm} onSubmit={onClickSubmit}>
                                <div className={`${styles.formFields}`}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='code'>코드</label>
                                        <input type="text" id="code" name="code" value={code} maxLength={16} required onChange={(e) => setCode(e.target.value)}/>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='name'>이름</label>
                                        <input type="text" id="name" name="name" value={name} maxLength={16} onChange={(e) => setName(e.target.value)}/>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='comment'>설명</label>
                                        <input type="text" id="comment" name="comment" value={comment} maxLength={32} onChange={(e) => setComment(e.target.value)}/>
                                    </div>
                                </div>

                                <div className={`${styles.buttonGroup}`}>
                                    <CancleButton svg={null} value='취소' type='button' onClick={() => setIsOpen(false)}></CancleButton>
                                    <InsertButton svg={null} value='저장' type='submit' onClick={() => {}}></InsertButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </ModalPortal>
        </>
    )
}

export const InsertBoardRoleModal = ({isOpen, setIsOpen, fetchData} : insertModalProps) => {
    if (!isOpen) return;

    const {accessToken} = useAuth();

    const [boards, setBoards] = useState<Board[]>();
    const [boardRoleCodes, setBoardRoleCodes] = useState<BoardRoleCode[]>();
    const [memberRoleCodes, setNemberRoleCodes] = useState<MemberRoleCode[]>();

    const [selectedBoardId, setSelectedBoardId] = useState<number>();
    const [selectedBoardRoleCodeId, setSelectedBoardRoleCodeId] = useState<number>();
    const [selectedMemberRoleCodeId, setSelectedMemberRoleCodeId] = useState<number>();

    // board 조회
    const fetchBoards = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/boards`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Board[]>;
        })
        .then(res => {
            setBoards(res);
            setSelectedBoardId(res[0].id);
        })
        .catch(err => console.error(err));
    }
    // board_role_code 조회
    const fetchBoardRoleCodes = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/boardRoleCodes`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<BoardRoleCode[]>;
        })
        .then(res => {
            setBoardRoleCodes(res);
            setSelectedBoardRoleCodeId(res[0].id);
        })
        .catch(err => console.error(err));
    }
    // memeber_role_code 조회
    const fetchBoardMemberCodes = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/memberRoleCodes`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<MemberRoleCode[]>;
        })
        .then(res => {
            setNemberRoleCodes(res);
            setSelectedMemberRoleCodeId(undefined);
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchBoards();
        fetchBoardRoleCodes();
        fetchBoardMemberCodes();
    }, []);

    const onClickSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/boardRole`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                boardId: selectedBoardId,
                boardRoleCodeId: selectedBoardRoleCodeId,
                memberRoleCodeId: selectedMemberRoleCodeId,
            })
        })
        .then(res => {
            if(!res.ok) throw res;
            return res.json();
        })
        .then(res => {
            alert('게시판 권한이 추가되었습니다.');
            setIsOpen(false);
            fetchData();
        })
        .catch((res :Response)=> {
            if (res.status === 409) {
                alert('해당 게시판 권한이 존재합니다.');
            }
        })
    }
    
    return (
        <>
            <ModalPortal>
                <div className={styles.overlay}>
                    <div className={styles.modal}>

                        <X className={styles.exit} color='grey' size={24} strokeWidth={1} onClick={() => setIsOpen(false)}/>

                        <div className={`${styles.modalHeader}`}>
                            <h2>게시판 권한 추가</h2>
                            <p>새로운 게시판 권한을 추가합니다.</p>
                        </div>

                        <div className={`${styles.modalBody}`}>
                            <form className={styles.modalForm} onSubmit={onClickSubmit}>
                                <div className={`${styles.formFields}`}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='board'>게시판</label>
                                        <select name='board' value={selectedBoardId} onChange={(e) => setSelectedBoardId(Number(e.target.value))}>
                                            {boards?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.categoryCode} ({value.categoryName})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='boardRoleCode'>이름</label>
                                        <select name='boardRoleCode' value={selectedBoardRoleCodeId} onChange={(e) => setSelectedBoardRoleCodeId(Number(e.target.value))}>
                                            {boardRoleCodes?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.code} ({value.name})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='memberRoleCode'>설명</label>
                                        <select name='memberRoleCode' value={selectedMemberRoleCodeId} onChange={(e) => setSelectedMemberRoleCodeId(Number(e.target.value))}>
                                            <option>전체</option>
                                            {memberRoleCodes?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.code} ({value.name})</option>
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className={`${styles.buttonGroup}`}>
                                    <CancleButton svg={null} value='취소' type='button' onClick={() => setIsOpen(false)}></CancleButton>
                                    <InsertButton svg={null} value='추가' type='submit' onClick={() => {}}></InsertButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </ModalPortal>
        </>
    )
}

export const EditBoardRoleModal = ({isOpen, setIsOpen, fetchData, data} : editModalProps) => {
    if (!isOpen) return;

    const {accessToken} = useAuth();

    const [boards, setBoards] = useState<Board[]>();
    const [boardRoleCodes, setBoardRoleCodes] = useState<BoardRoleCode[]>();
    const [memberRoleCodes, setNemberRoleCodes] = useState<MemberRoleCode[]>();

    const [selectedBoardId, setSelectedBoardId] = useState<number>(data.board.id);
    const [selectedBoardRoleCodeId, setSelectedBoardRoleCodeId] = useState<number>(data.boardRoleCode.id);
    const [selectedMemberRoleCodeId, setSelectedMemberRoleCodeId] = useState<number>(data?.memberRoleCode?.id);

    // board 조회
    const fetchBoards = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/boards`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Board[]>;
        })
        .then(res => {
            setBoards(res);
        })
        .catch(err => console.error(err));
    }
    // board_role_code 조회
    const fetchBoardRoleCodes = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/boardRoleCodes`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<BoardRoleCode[]>;
        })
        .then(res => {
            setBoardRoleCodes(res);
        })
        .catch(err => console.error(err));
    }
    // memeber_role_code 조회
    const fetchBoardMemberCodes = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/memberRoleCodes`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<MemberRoleCode[]>;
        })
        .then(res => {
            setNemberRoleCodes(res);
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchBoards();
        fetchBoardRoleCodes();
        fetchBoardMemberCodes();
    }, []);

    const onClickSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/boardRole/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                boardId: selectedBoardId,
                boardRoleCodeId: selectedBoardRoleCodeId,
                memberRoleCodeId: selectedMemberRoleCodeId,
            })
        })
        .then(res => {
            if(!res.ok) throw res;
            return res.json();
        })
        .then(res => {
            alert('게시판 권한이 수정되었습니다.');
            setIsOpen(false);
            fetchData();
        })
        .catch((res :Response)=> {
            if (res.status === 409) {
                alert('해당 게시판 권한이 존재합니다.');
            }
        })
    }
    
    return (
        <>
            <ModalPortal>
                <div className={styles.overlay}>
                    <div className={styles.modal}>

                        <X className={styles.exit} color='grey' size={24} strokeWidth={1} onClick={() => setIsOpen(false)}/>

                        <div className={`${styles.modalHeader}`}>
                            <h2>게시판 권한 수정</h2>
                            <p>게시판 권한을 수정합니다.</p>
                        </div>

                        <div className={`${styles.modalBody}`}>
                            <form className={styles.modalForm} onSubmit={onClickSubmit}>
                                <div className={`${styles.formFields}`}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='board'>게시판</label>
                                        <select name='board' value={selectedBoardId} onChange={(e) => setSelectedBoardId(Number(e.target.value))}>
                                            {boards?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.categoryCode} ({value.categoryName})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='boardRoleCode'>이름</label>
                                        <select name='boardRoleCode' value={selectedBoardRoleCodeId} onChange={(e) => setSelectedBoardRoleCodeId(Number(e.target.value))}>
                                            {boardRoleCodes?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.code} ({value.name})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='memberRoleCode'>설명</label>
                                        <select name='memberRoleCode' value={selectedMemberRoleCodeId} onChange={(e) => setSelectedMemberRoleCodeId(Number(e.target.value))}>
                                            <option>전체</option>
                                            {memberRoleCodes?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.code} ({value.name})</option>
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className={`${styles.buttonGroup}`}>
                                    <CancleButton svg={null} value='취소' type='button' onClick={() => setIsOpen(false)}></CancleButton>
                                    <InsertButton svg={null} value='저장' type='submit' onClick={() => {}}></InsertButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </ModalPortal>
        </>
    )
}
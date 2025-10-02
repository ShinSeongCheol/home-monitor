import styles from '../styles/components/BackOfficeBoardModal.module.css';

import { useEffect, useState, type FormEventHandler, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { CancleButton, InsertButton } from './ButtonComponent';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import type { Board, BoardRole, BoardRoleCode, Comment, Member, MemberRoleCode, Post, ReactionCode } from '../layouts/BackOfficeLayout';
import CkEditorComponent from './CkEditorComponent';
import DOMPurify from 'dompurify';

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
                                        <label htmlFor='boardRoleCode'>게시판 권한</label>
                                        <select name='boardRoleCode' value={selectedBoardRoleCodeId} onChange={(e) => setSelectedBoardRoleCodeId(Number(e.target.value))}>
                                            {boardRoleCodes?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.code} ({value.name})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='memberRoleCode'>사용자 권한</label>
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
                                        <label htmlFor='boardRoleCode'>게시판 권한</label>
                                        <select name='boardRoleCode' value={selectedBoardRoleCodeId} onChange={(e) => setSelectedBoardRoleCodeId(Number(e.target.value))}>
                                            {boardRoleCodes?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.code} ({value.name})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='memberRoleCode'>사용자 권한</label>
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

export const InsertBoardRoleCodeModal = ({isOpen, setIsOpen, fetchData} : insertModalProps) => {
    if (!isOpen) return;

    const {accessToken} = useAuth();

    const [code, setCode] = useState<string>("");
    const [name, setName] = useState<string>("");


    const onClickSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/boardRoleCodes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                code: code,
                name: name,
            })
        })
        .then(res => {
            if(!res.ok) throw res;
            return res.json();
        })
        .then(res => {
            alert('게시판 권한 코드가 추가되었습니다.');
            setIsOpen(false);
            fetchData();
        })
        .catch((res :Response)=> {
            if (res.status === 409) {
                alert('해당 게시판 권한 코드가 존재합니다.');
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
                            <h2>게시판 권한 코드 추가</h2>
                            <p>새로운 게시판 권한 코드를 추가합니다.</p>
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

export const EditBoardRoleCodeModal = ({isOpen, setIsOpen, fetchData, data} : editModalProps) => {
    if (!isOpen) return;

    const {accessToken} = useAuth();

    const [code, setCode] = useState<string>(data.code);
    const [name, setName] = useState<string>(data.name);

    const onClickSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/boardRoleCodes/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                code: code,
                name: name,
            })
        })
        .then(res => {
            if(!res.ok) throw res;
            return res.json();
        })
        .then(res => {
            alert('게시판 권한 코드가 수정되었습니다.');
            setIsOpen(false);
            fetchData();
        })
        .catch((res :Response)=> {
            if (res.status === 409) {
                alert('해당 게시판 권한 코드가 존재합니다.');
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
                            <h2>게시판 권한 코드 수정</h2>
                            <p>게시판 권한 코드를 수정합니다.</p>
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

export const InsertPostModal = ({isOpen, setIsOpen, fetchData} : insertModalProps) => {
    if (!isOpen) return;

    const {accessToken} = useAuth();

    const [boards, setBoards] = useState<Board[]>();
    const [members, setMembers] = useState<Member[]>();
    const [title, setTitle] = useState<string>();
    const [content, setContent] = useState<string>("");

    const [selectedBoardId, setSelectedBoardId] = useState<number>();
    const [selectedMemberId, setSelectedMemberId] = useState<number>();

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

    // member 조회
    const fetchMembers = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/members`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Member[]>;
        })
        .then(res => {
            setMembers(res);
            setSelectedMemberId(res[0].id);
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchBoards();
        fetchMembers();
    }, []);


    const onClickSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                memberId: selectedMemberId,
                boardId: selectedBoardId,
                title: title,
                content: content,
            })
        })
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json();
        })
        .then(res => {
            alert('게시물이 추가되었습니다.');
            setIsOpen(false);
            fetchData();
        })
        .catch(err => console.log(err));
    }
    
    return (
        <>
            <ModalPortal>
                <div className={styles.overlay}>
                    <div className={`${styles.postModal}`}>

                        <X className={styles.exit} color='grey' size={24} strokeWidth={1} onClick={() => setIsOpen(false)}/>

                        <div className={`${styles.modalHeader}`}>
                            <h2>게시물 추가</h2>
                            <p>새로운 게시물을 추가합니다.</p>
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
                                        <label htmlFor='board'>작성자</label>
                                        <select name='board' value={selectedMemberId} onChange={(e) => setSelectedMemberId(Number(e.target.value))}>
                                            {members?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.email} ({value.username})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='title'>제목</label>
                                        <input type="text" id="title" name="title" value={title} maxLength={16} onChange={(e) => setTitle(e.target.value)}/>
                                    </div>

                                    <CkEditorComponent data={content} handleChange={setContent}></CkEditorComponent>

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

export const EditPostModal = ({isOpen, setIsOpen, fetchData, data} : editModalProps) => {
    if (!isOpen) return;

    const {accessToken} = useAuth();

    const [boards, setBoards] = useState<Board[]>();
    const [members, setMembers] = useState<Member[]>();
    const [title, setTitle] = useState<string>(data.title);
    
    DOMPurify.addHook('uponSanitizeElement', (node, data) => {
        if(data.tagName === 'iframe') {
            const el = node as Element;
            const src = el.getAttribute('src') || '';
            const allowedSrc = ['https://www.youtube.com/embed/', 'https://www.dailymotion.com/embed/']

            const isAllowed = allowedSrc.some(prefix => src.startsWith(prefix));
            if(!isAllowed)
                el.remove()
        }
    });

    const santiizedContent = DOMPurify.sanitize(data.content, {
        ADD_TAGS: ["iframe"],
        ADD_ATTR: ["src", "width", "height", "frameborder", "allow", "allowfullscreen"],
    });

    const [content, setContent] = useState<string>(santiizedContent);

    const [selectedBoardId, setSelectedBoardId] = useState<number>(data.board.id);
    const [selectedMemberId, setSelectedMemberId] = useState<number>(data.member.id);


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

    // member 조회
    const fetchMembers = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/members`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Member[]>;
        })
        .then(res => {
            setMembers(res);
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchBoards();
        fetchMembers();
    }, []);

    const onClickSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/posts/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                memberId: selectedMemberId,
                boardId: selectedBoardId,
                title: title,
                content: content,
            })
        })
        .then(res => {
            if(!res.ok) throw new Error(`Http Status ${res.status}`);
            return res.json();
        })
        .then(res => {
            alert('게시물이 수정되었습니다.');
            setIsOpen(false);
            fetchData();
        })
        .catch(err => console.error(err));
    }
    
    return (
        <>
            <ModalPortal>
                <div className={styles.overlay}>
                    <div className={styles.postModal}>

                        <X className={styles.exit} color='grey' size={24} strokeWidth={1} onClick={() => setIsOpen(false)}/>

                        <div className={`${styles.modalHeader}`}>
                            <h2>게시물 수정</h2>
                            <p>게시물을 수정합니다.</p>
                        </div>

                        <div className={`${styles.modalBody}`}>
                            <form className={styles.modalForm} onSubmit={onClickSubmit}>
                                <div className={styles.formGroup}>
                                        <label htmlFor='board'>게시판</label>
                                        <select name='board' value={selectedBoardId} onChange={(e) => setSelectedBoardId(Number(e.target.value))}>
                                            {boards?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.categoryCode} ({value.categoryName})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='board'>작성자</label>
                                        <select name='board' value={selectedMemberId} onChange={(e) => setSelectedMemberId(Number(e.target.value))}>
                                            {members?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.email} ({value.username})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='title'>제목</label>
                                        <input type="text" id="title" name="title" value={title} maxLength={16} onChange={(e) => setTitle(e.target.value)}/>
                                    </div>

                                    <CkEditorComponent data={content} handleChange={setContent}></CkEditorComponent>

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

export const InsertCommentModal = ({isOpen, setIsOpen, fetchData} : insertModalProps) => {
    if (!isOpen) return;

    const {accessToken} = useAuth();

    const [posts, setPosts] = useState<Post[]>();
    const [members, setMembers] = useState<Member[]>();
    const [parentComments, setParentComments] = useState<Comment[]>();
    const [content, setContent] = useState<string>("");

    const [selectedPostId, setSelectedPostId] = useState<number>();
    const [selectedMemberId, setSelectedMemberId] = useState<number>();
    const [selectedParentCommentId, setSelectedParentCommentId] = useState<number>();

    // board 조회
    const fetchBoards = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/posts`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Post[]>;
        })
        .then(res => {
            setPosts(res);
            setSelectedPostId(res[0].id);
        })
        .catch(err => console.error(err));
    }

    // member 조회
    const fetchMembers = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/members`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Member[]>;
        })
        .then(res => {
            setMembers(res);
            setSelectedMemberId(res[0].id);
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchBoards();
        fetchMembers();
    }, []);

    useEffect(() => {
        if(!selectedPostId) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/posts/${selectedPostId}`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Post>;
        })
        .then(res => {
            setSelectedParentCommentId(undefined);

            setParentComments(res.comments)
        })
        .catch(err => console.error(err));

    }, [selectedPostId])


    const onClickSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                memberId: selectedMemberId,
                postId: selectedPostId,
                parentCommentId: selectedParentCommentId === 0 ? null : selectedParentCommentId ,
                content: content,
            })
        })
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json();
        })
        .then(res => {
            alert('댓글이 추가되었습니다.');
            setIsOpen(false);
            fetchData();
        })
        .catch(err => console.log(err));
    }
    
    return (
        <>
            <ModalPortal>
                <div className={styles.overlay}>
                    <div className={`${styles.modal}`}>

                        <X className={styles.exit} color='grey' size={24} strokeWidth={1} onClick={() => setIsOpen(false)}/>

                        <div className={`${styles.modalHeader}`}>
                            <h2>댓글 추가</h2>
                            <p>새로운 댓글을 추가합니다.</p>
                        </div>

                        <div className={`${styles.modalBody}`}>
                            <form className={styles.modalForm} onSubmit={onClickSubmit}>
                                <div className={`${styles.formFields}`}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='board'>게시물</label>
                                        <select name='board' value={selectedPostId} onChange={(e) => setSelectedPostId(Number(e.target.value))}>
                                            {posts?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.id} ({value.title})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='board'>작성자</label>
                                        <select name='board' value={selectedMemberId} onChange={(e) => setSelectedMemberId(Number(e.target.value))}>
                                            {members?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.email} ({value.username})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='parentCommentId'>부모 댓글 ID</label>
                                        <select name='parentCommentId' value={selectedParentCommentId} onChange={(e) => setSelectedParentCommentId(Number(e.target.value))}>
                                            <option value="">{''}</option>
                                            {parentComments?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.id}</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='content'>내용</label>
                                        <input type="text" id="content" name="content" value={content} maxLength={128} onChange={(e) => setContent(e.target.value)}/>
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

export const EditCommentModal = ({isOpen, setIsOpen, fetchData, data} : editModalProps) => {
    if (!isOpen) return;

    const {accessToken} = useAuth();

    const [posts, setPosts] = useState<Post[]>();
    const [members, setMembers] = useState<Member[]>();
    const [parentComments, setParentComments] = useState<Comment[]>();
    const [content, setContent] = useState<string>("");

    const [selectedPostId, setSelectedPostId] = useState<number>(data.post.id);
    const [selectedMemberId, setSelectedMemberId] = useState<number>(data.member.id);
    const [selectedParentCommentId, setSelectedParentCommentId] = useState<number>(data.parentComment?.id);

    // board 조회
    const fetchPosts = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/posts`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Post[]>;
        })
        .then(res => {
            setPosts(res);
        })
        .catch(err => console.error(err));
    }

    // member 조회
    const fetchMembers = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/members`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Member[]>;
        })
        .then(res => {
            setMembers(res);
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchPosts();
        fetchMembers();
    }, []);

    useEffect(() => {
        if(!selectedPostId) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/posts/${selectedPostId}`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Post>;
        })
        .then(res => {
            setParentComments(res.comments)
        })
        .catch(err => console.error(err));

    }, [selectedPostId])

    const onClickSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/comments/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                memberId: selectedMemberId,
                postId: selectedPostId,
                parentCommentId: selectedParentCommentId === 0 ? null : selectedParentCommentId,
                content: content,
            })
        })
        .then(res => {
            if(!res.ok) throw new Error(`Http Status ${res.status}`);
            return res.json();
        })
        .then(res => {
            alert('게시물이 수정되었습니다.');
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
                            <h2>게시물 수정</h2>
                            <p>게시물을 수정합니다.</p>
                        </div>

                        <div className={`${styles.modalBody}`}>
                            <form className={styles.modalForm} onSubmit={onClickSubmit}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='post'>게시물</label>
                                        <select name='post' value={selectedPostId} onChange={(e) => setSelectedPostId(Number(e.target.value))}>
                                            {posts?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.id} ({value.title})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='member'>작성자</label>
                                        <select name='member' value={selectedMemberId} onChange={(e) => setSelectedMemberId(Number(e.target.value))}>
                                            {members?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.email} ({value.username})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='parentCommentId'>부모 댓글 ID</label>
                                        <select name='parentCommentId' value={selectedParentCommentId} onChange={(e) => setSelectedParentCommentId(Number(e.target.value))}>
                                            <option value="">{''}</option>
                                            {parentComments?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.id}</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='content'>내용</label>
                                        <input type="text" id="content" name="content" value={content} maxLength={128} onChange={(e) => setContent(e.target.value)}/>
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

export const InsertReactionModal = ({isOpen, setIsOpen, fetchData} : insertModalProps) => {
    if (!isOpen) return;

    const {accessToken} = useAuth();

    const [posts, setPosts] = useState<Post[]>();
    const [members, setMembers] = useState<Member[]>();
    const [comments, setComments] = useState<Comment[]>();
    const [reactionCodes, setReactionCodes] = useState<ReactionCode[]>();

    const [selectedPostId, setSelectedPostId] = useState<number>();
    const [selectedMemberId, setSelectedMemberId] = useState<number>();
    const [selectedCommentId, setSelectedCommentId] = useState<number>();
    const [selectedReactionCodeId, setSelectedReactionCodeId] = useState<number>();

    // board 조회
    const fetchPosts = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/posts`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Post[]>;
        })
        .then(res => {
            setPosts(res);
            setSelectedPostId(res[0].id);
        })
        .catch(err => console.error(err));
    }

    // member 조회
    const fetchMembers = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/members`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Member[]>;
        })
        .then(res => {
            setMembers(res);
            setSelectedMemberId(res[0].id);
        })
        .catch(err => console.error(err));
    }

    // comment 조회
    const fetchComments = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/comments`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Comment[]>;
        })
        .then(res => {
            setComments(res);
            setSelectedCommentId(res[0].id);
        })
        .catch(err => console.error(err));
    }

    // reactionCode 조회
    const fetchReactionCodes = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/reactionCodes`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<ReactionCode[]>;
        })
        .then(res => {
            setReactionCodes(res);
            setSelectedReactionCodeId(res[0].id);
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchPosts();
        fetchMembers();
        fetchComments();
        fetchReactionCodes();
    }, []);

    useEffect(() => {
        if (!selectedPostId) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/posts/${selectedPostId}`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Post>;
        })
        .then(res => {
            setSelectedCommentId(undefined);
            setComments(res.comments);
        })
        .catch(err => console.error(err));

    }, [selectedPostId])


    const onClickSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/reactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                memberId: selectedMemberId,
                postId: selectedPostId,
                commentId: selectedCommentId === 0 ? "" : selectedCommentId,
                reactionCodeId: selectedReactionCodeId
            })
        })
        .then(res => {
            if(!res.ok) throw res.status;
            return res.json();
        })
        .then(res => {
            alert('반응이 추가되었습니다.');
            setIsOpen(false);
            fetchData();
        })
        .catch(status => {
            if (status === 400) {
                alert('해당 반응은 이미 존재합니다.')
            }else if (status === 409) {
                alert('해당 반응은 이미 존재합니다.')
            }
        });
    }
    
    return (
        <>
            <ModalPortal>
                <div className={styles.overlay}>
                    <div className={`${styles.modal}`}>

                        <X className={styles.exit} color='grey' size={24} strokeWidth={1} onClick={() => setIsOpen(false)}/>

                        <div className={`${styles.modalHeader}`}>
                            <h2>반응 추가</h2>
                            <p>새로운 반응을 추가합니다.</p>
                        </div>

                        <div className={`${styles.modalBody}`}>
                            <form className={styles.modalForm} onSubmit={onClickSubmit}>
                                <div className={`${styles.formFields}`}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='post'>게시물</label>
                                        <select name='post' value={selectedPostId} onChange={(e) => setSelectedPostId(Number(e.target.value))}>
                                            {posts?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.id} ({value.title})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='comment'>댓글</label>
                                        <select name='comment' value={selectedCommentId} onChange={(e) => setSelectedCommentId(Number(e.target.value))}>
                                            <option value=""></option>
                                            {comments?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.id} ({value.content})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='member'>작성자</label>
                                        <select name='member' value={selectedMemberId} onChange={(e) => setSelectedMemberId(Number(e.target.value))}>
                                            {members?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.email} ({value.username})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='reactionCode'>반응 코드</label>
                                        <select name='reactionCode' value={selectedReactionCodeId} onChange={(e) => setSelectedReactionCodeId(Number(e.target.value))}>
                                            {reactionCodes?.map((value) => {
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

export const EditReactionModal = ({isOpen, setIsOpen, fetchData, data} : editModalProps) => {
    if (!isOpen) return;

    console.log(data);

    const {accessToken} = useAuth();

    const [posts, setPosts] = useState<Post[]>();
    const [members, setMembers] = useState<Member[]>();
    const [comments, setComments] = useState<Comment[]>();
    const [reactionCodes, setReactionCodes] = useState<ReactionCode[]>();

    const [selectedPostId, setSelectedPostId] = useState<number>(data.post.id);
    const [selectedMemberId, setSelectedMemberId] = useState<number>(data.member.id);
    const [selectedCommentId, setSelectedCommentId] = useState<number>(data.comment.id);
    const [selectedReactionCodeId, setSelectedReactionCodeId] = useState<number>(data.reactionCode.id);

    // post 조회
    const fetchPosts = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/posts`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Post[]>;
        })
        .then(res => {
            setPosts(res);
        })
        .catch(err => console.error(err));
    }

    // member 조회
    const fetchMembers = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/members`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Member[]>;
        })
        .then(res => {
            setMembers(res);
        })
        .catch(err => console.error(err));
    }

    // comment 조회
    const fetchComments = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/comments`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Comment[]>;
        })
        .then(res => {
            setComments(res);
        })
        .catch(err => console.error(err));
    }

    // reactionCode 조회
    const fetchReactionCodes = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/reactionCodes`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<ReactionCode[]>;
        })
        .then(res => {
            setReactionCodes(res);
        })
        .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchPosts();
        fetchMembers();
        fetchComments();
        fetchReactionCodes();
    }, []);

    useEffect(() => {
        if (!selectedPostId) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/posts/${selectedPostId}`)
        .then(res => {
            if(!res.ok) throw new Error(`Http Error ${res.status}`);
            return res.json() as Promise<Post>;
        })
        .then(res => {
            setComments(res.comments);
        })
        .catch(err => console.error(err));

    }, [selectedPostId])

    const onClickSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        fetch(`${import.meta.env.VITE_API_URL}/api/v1/backoffice/reactions/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({
                memberId: selectedMemberId,
                postId: selectedPostId,
                commentId: selectedCommentId === 0 ? "" : selectedCommentId,
                reactionCodeId: selectedReactionCodeId
            })
        })
        .then(res => {
            if(!res.ok) throw res.status;
            return res.json();
        })
        .then(res => {
            alert('반응이 수정되었습니다.');
            setIsOpen(false);
            fetchData();
        })
        .catch(status => {
            if (status === 400) {
                alert('해당 반응은 이미 존재합니다.')
            }else if (status === 409) {
                alert('해당 반응은 이미 존재합니다.')
            }
        });
    }
    
    return (
        <>
            <ModalPortal>
                <div className={styles.overlay}>
                    <div className={styles.modal}>

                        <X className={styles.exit} color='grey' size={24} strokeWidth={1} onClick={() => setIsOpen(false)}/>

                        <div className={`${styles.modalHeader}`}>
                            <h2>게시물 수정</h2>
                            <p>게시물을 수정합니다.</p>
                        </div>

                        <div className={`${styles.modalBody}`}>
                            <form className={styles.modalForm} onSubmit={onClickSubmit}>
                                <div className={`${styles.formFields}`}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='post'>게시물</label>
                                        <select name='post' value={selectedPostId} onChange={(e) => setSelectedPostId(Number(e.target.value))}>
                                            {posts?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.id} ({value.title})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='comment'>댓글</label>
                                        <select name='comment' value={selectedCommentId} onChange={(e) => setSelectedCommentId(Number(e.target.value))}>
                                            <option value=""></option>
                                            {comments?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.id} ({value.content})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='member'>작성자</label>
                                        <select name='member' value={selectedMemberId} onChange={(e) => setSelectedMemberId(Number(e.target.value))}>
                                            {members?.map((value) => {
                                                return <option key={value.id} value={value.id}>{value.email} ({value.username})</option>
                                            })}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor='reactionCode'>반응 코드</label>
                                        <select name='reactionCode' value={selectedReactionCodeId} onChange={(e) => setSelectedReactionCodeId(Number(e.target.value))}>
                                            {reactionCodes?.map((value) => {
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
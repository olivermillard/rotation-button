import React, { useState } from 'react';
import { BsCheckSquare, BsXSquare } from 'react-icons/bs';
import './RotationButton.css';

type RbAnswer = 'yes' | 'no' | 'pending';

const RotationButton = () => {
    const [ response, setResponse ] = useState<RbAnswer>('pending');
    const [ isMoving, setIsMoving ] = useState(false);
    const [ frontIsAnswer, setFrontIsAnswer ] = useState(false);
    const [ additionalClasses, setAdditionalClasses ] = useState('');
    const [ showNudge, setShowNudge ] = useState(false);

    const resetState = () => {
        setResponse('pending');
        setIsMoving(false);
        setFrontIsAnswer(false);
        setAdditionalClasses('');
    };

    const classesByAnswer = (): string => {
        if(response === 'yes') {
            return 'rb_side_confirm rb_side_resp';
        }
        else if(response === 'no') {
            return 'rb_side_deny rb_side_resp';
        }
        else {
            return 'rb_side_pending';
        }
    };

    const answerSideText = (): string => {
        if(response === 'yes') {
            return 'confirmed';
        }
        else if(response === 'no') {
            return 'denied';
        }
        else {
            return 'pending';
        }
    };

    const icon = () => {
        if(response === 'yes') {
            return <BsCheckSquare/>;
        }
        else if(response === 'no') {
            return <BsXSquare/>;
        }
        else {
            return <></>;
        }
    };

    const updateFront = (isReset: boolean) => {
        if(isReset) {
            setFrontIsAnswer(!isReset);
        }
        else {
            setTimeout(function () {
                setFrontIsAnswer(!isReset);
                console.log('updated');
            }, 1200);
        }
    };

    const resetAnim = (isConfirm: boolean) => {
        setShowNudge(false);
        const additionalClass = isConfirm ? 'fromConfirm' : 'fromDeny';
        if(!isMoving) {
            setAdditionalClasses(`rb_box_pending_anim ${additionalClass}`);
            updateFront(true);
            setTimeout(function () {
                resetState();
            }, 2000); // same duration as the animation
        }
    };

    const buttonsSide = () => {
        if(frontIsAnswer) {
            return (
                <div className={classesByAnswer()}>
                    {answerSideText()}
                </div>
            );
        }

        return (
            <div className='rb_side_button_container'>
                <div
                    className='rb_side_button rb_side_confirm'
                    onClick={() => {
                        if(!isMoving) {
                            setResponse('yes');
                            updateFront(false);
                        }
                    }}
                >
                    {'YES'}
                </div>
                <div className='rb_side_button_divider'/>
                <div
                    className='rb_side_button rb_side_deny'
                    onClick={() => {
                        if(!isMoving) {
                            setResponse('no');
                            updateFront(false);
                        }
                    }}
                >
                    {'NO'}
                </div>
            </div>
        );
    };

    return (
        <div className='rb_wrapper'>
            <div className='rb_container'>
                <div
                    className={`rb_box
                        ${response === 'no' ? 'rb_box_deny_anim' : ''}
                        ${response === 'yes' ? 'rb_box_confirm_anim' : ''}
                        ${response === 'pending' ? '' : ''}
                        ${additionalClasses}`
                    }
                    onAnimationStart={() => setIsMoving(true)}
                    onAnimationEnd={() => {
                        setIsMoving(false);
                        setShowNudge(true);
                    }}
                >
                    <div className='rb_side rb_side_l' id='rb_front'>
                        {buttonsSide()}
                    </div>
                    {/* back */}
                    <div
                        id='rb_back'
                        className={`rb_side rb_side_l ${classesByAnswer()}`}
                    >
                        {answerSideText()}
                    </div>
                    {/* end for confirm */}
                    <div
                        className={`rb_side rb_side_tb rb_side_resp ${classesByAnswer()}`}
                        id='rb_top'
                        onClick={() => resetAnim(true)}
                    >
                        {answerSideText()}
                    </div>
                    {/* end for deny */}
                    <div
                        className={`rb_side rb_side_tb rb_side_resp ${classesByAnswer()}`}
                        id='rb_bottom'
                        onClick={() => resetAnim(false)}
                    >
                        {answerSideText()}
                    </div>
                    {/* the sides w/ icons */}
                    <div className={`rb_side rb_side_s ${classesByAnswer()}`} id='rb_right'>
                        {icon()}
                    </div>
                    <div className={`rb_side rb_side_s ${classesByAnswer()}`} id='rb_left'>
                        {icon()}
                    </div>
                </div>
            </div>
            <div className='rb_nudge_container'>
                <div className={`rb_nudge_text ${showNudge ? 'rb_nudge_visible' : 'rb_nudge_hidden'}`}>
                    {'click to reset'}
                </div>
            </div>
        </div>
    );
};

/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export {
    RotationButton,
};

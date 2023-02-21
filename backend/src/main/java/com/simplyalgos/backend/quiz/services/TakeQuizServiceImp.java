package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import com.simplyalgos.backend.quiz.domains.quizId.TakeQuizId;
import com.simplyalgos.backend.quiz.dtos.TakeQuizDTO;
import com.simplyalgos.backend.quiz.repositories.QuizRepository;
import com.simplyalgos.backend.quiz.repositories.TakeQuizRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class TakeQuizServiceImp implements TakeQuizService{

    private final TakeQuizRepository takeQuizRepository;
    private final QuizRepository quizRepository;
    @Override
    public TakeQuizDTO getTimeStamp(TakeQuizId takeQuizId) throws NoSuchElementException {
        if(takeQuizRepository.existsById(takeQuizId)) throw new NoSuchElementException(
                MessageFormat.format("Take Quiz with Id {0} not found", takeQuizId.getQuizId()));{
                    TakeQuiz takeQuiz = takeQuizRepository.findById(takeQuizId).get();
                    TakeQuizDTO takeQuizDTO = new TakeQuizDTO();
                    takeQuizDTO.setStartedAt(takeQuiz.getStartedAt());
                    takeQuizDTO.setFinishedAt(takeQuiz.getFinishedAt());
                    return takeQuizDTO;
        }
    }

    @Override
    public int getUserQuizScore(TakeQuizId takeQuizId) throws NoSuchElementException {
        if(takeQuizRepository.existsById(takeQuizId)) throw new NoSuchElementException(
                MessageFormat.format("Take Quiz with Id {0} not found", takeQuizId.getQuizId()));{
                    log.debug("Returning the score");
                   return takeQuizRepository.findById(takeQuizId).get().getScore();
        }
    }

    @Override
    public List<TakeQuizDTO> getAllUserQuizScore(UUID userId) {
        List<TakeQuiz> takeQuizList = takeQuizRepository.findAllByUserId(userId.toString());
        List<TakeQuizDTO> takeQuizDTOList = null;
        for(int i = 0; i < takeQuizList.size(); i++){
            takeQuizDTOList.add(new TakeQuizDTO(
                    takeQuizList.get(i).getTakeQuizId().getUserId(),
                    takeQuizList.get(i).getTakeQuizId().getQuizId(),
                    takeQuizList.get(i).getScore(),
                    takeQuizList.get(i).getStartedAt(),
                    takeQuizList.get(i).getFinishedAt()));

        }
        log.debug("ending the listing of all taken quiz by user");
        return takeQuizDTOList;
    }

//    @Override
//    public double getAverageUserQuizScore(UUID userId) {
//        List<TakeQuizDTO> takeQuizDTOList = getAllUserQuizScore(userId);
//        double avgScore = 0;
//        for(int i = 0; i < takeQuizDTOList.size(); i++){
//            avgScore += takeQuizDTOList.get(i).getScore();
//        }
//        return avgScore / takeQuizDTOList.size();
//    }

    @Override
    public double getAllAverageQuizScore(UUID quizId) {
        List<TakeQuiz> takeQuizList = takeQuizRepository.findAllByQuizId(quizId.toString());
        double maxScore = quizRepository.findById(quizId).get().getScore() * takeQuizList.size();

        double aveQuizScore = 0;
        for(int i = 0; i < takeQuizList.size(); i++){
            aveQuizScore += takeQuizList.get(i).getScore();
        }
        return aveQuizScore * 100;
    }

    //    IF A USER HAS TAKEN THE QUIZ PREVIOUSLY MUST USE QUIZ UPDATE ELSE IF THE USER HAS
//    NOT TAKEN THE QUIZ BEFORE THEN USE createTakenQuiz
    @Override
    public TakeQuizDTO takenQuizSubmit(TakeQuizDTO takeQuizDTO) {
        TakeQuizId inTakeQuizId = new TakeQuizId(takeQuizDTO.getUserId(), takeQuizDTO.getQuizId());
        if(takeQuizRepository.existsById(inTakeQuizId)){
            return updateTakenQuiz(takeQuizDTO);
        }
        else{
            log.debug("Starting the creation of a new Take Quiz");
            TakeQuiz takeQuiz = takeQuizRepository.saveAndFlush(
                    TakeQuiz.builder()
                            .takeQuizId(new TakeQuizId(takeQuizDTO.getUserId(),takeQuizDTO.getQuizId()))
                            .score(takeQuizDTO.getScore())
                            .startedAt(takeQuizDTO.getStartedAt())
                            .finishedAt(takeQuizDTO.getFinishedAt())
                            .build()
            );
            TakeQuizDTO takeQuizDTOReturn = new TakeQuizDTO();
            takeQuizDTOReturn.setScore(takeQuiz.getScore());
            takeQuizDTOReturn.setFinishedAt(takeQuiz.getFinishedAt());
            takeQuizDTOReturn.setStartedAt(takeQuiz.getStartedAt());
            takeQuizDTOReturn.setQuizId(takeQuiz.getTakeQuizId().getQuizId());
            takeQuizDTOReturn.setUserId(takeQuiz.getTakeQuizId().getUserId());

            log.debug("Finishing the creation of a new take quiz");
            return takeQuizDTOReturn;
        }
    }

    @Override
    public boolean deleteTakenQuiz(TakeQuizId takeQuizId) throws NoSuchElementException {
        if(takeQuizRepository.existsById(takeQuizId)) throw new NoSuchElementException(
                MessageFormat.format("Take Quiz with Id {0} not found", takeQuizId.getQuizId()));{
            log.debug("Taken Quiz found not deleting taken quiz with UUIDs of QUIZID: "+
                    takeQuizId.getQuizId() + " USERID: " + takeQuizId.getUserId());
            takeQuizRepository.deleteById(takeQuizId);
            log.debug("The taken quiz has been deleted");
            return true;
        }
    }

    @Override
    public TakeQuizDTO updateTakenQuiz(TakeQuizDTO takeQuizDTO) {
        TakeQuizId takeQuizId = new TakeQuizId(takeQuizDTO.getUserId(), takeQuizDTO.getQuizId());
        Optional<TakeQuiz> optionalTakeQuizUpdate = takeQuizRepository.findById(takeQuizId);
        if(optionalTakeQuizUpdate.isPresent()){
            log.debug("Updating the take quiz");
            TakeQuiz takeQuiz = optionalTakeQuizUpdate.get();
            takeQuiz.setScore(takeQuizDTO.getScore());
            takeQuiz.setStartedAt(takeQuizDTO.getStartedAt());
            takeQuiz.setFinishedAt(takeQuizDTO.getFinishedAt());
            log.debug("saving updated take quiz");
            takeQuizRepository.saveAndFlush(takeQuiz);
            log.debug("returning updated take quiz dto");
            return takeQuizDTO;
        }

        throw new NoSuchElementException(MessageFormat.format("Take quiz with id {0} not found", takeQuizDTO.getUserId()));

    }
}

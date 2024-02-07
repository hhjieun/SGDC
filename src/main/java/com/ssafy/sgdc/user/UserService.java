package com.ssafy.sgdc.user;

import com.ssafy.sgdc.badge.Badge;
import com.ssafy.sgdc.badge.BadgeService;
import com.ssafy.sgdc.user.dto.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private BadgeService badgeService;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User signUp(UserSignUpDto userSignDto){
        User user = User.builder()
                .userId(0)
                .loginId(userSignDto.getLoginId())
                .userSsafyId(userSignDto.getUserSsafyId())
                .userEmail(userSignDto.getUserEmail())
                .userNickname(userSignDto.getUserNickname())
                .userName(userSignDto.getUserName())
                .userPhone(userSignDto.getUserPhone())
                .userPassword(passwordEncoder.encode(userSignDto.getUserPassword()))
                .userImg(null) //보류
                .createAt(LocalDateTime.now())
                .updateAt(LocalDateTime.now())
                .signOut(false)
                .badgeId(null) //보류
                .kakaoPush(userSignDto.getKakaoPush())
                .challengeCnt(3)
                .complainCnt(0)
                .auth("ROLE_USER").build();
        System.out.println("ssafy_user 확인===>");
        return userRepo.save(user);
    }
    @Transactional
    public boolean checkId(String loginId){
        boolean loginIdDuplicate = userRepo.existsByLoginId(loginId);
        return loginIdDuplicate;
    }

    @Transactional
    public boolean checkNickname(String userNickname){
        boolean nickNameDuplicate = userRepo.existsByUserNickname(userNickname);
        return nickNameDuplicate;
    }

    @Transactional
    public boolean checkSsafyId(int userSsafyId){
        boolean ssafyIdDuplicate = userRepo.existsByUserSsafyId(userSsafyId);
        return ssafyIdDuplicate;
    }
    @Transactional
    public boolean checkPhone(String userPhone){
        boolean userPhoneDuplicate = userRepo.existsByUserPhone(userPhone);
        return userPhoneDuplicate;
    }

    public User login(UserLoginDto userLoginDto){
        User userLoginId = userRepo.findByLoginId(userLoginDto.getLoginId());

        if(userLoginId==null){
            System.out.println("아이디 못찾음");
            return null;
        }
        else{ // 아이디 존재
            // 암호화 패스워드
            if(passwordEncoder.matches(userLoginDto.getUserPassword(), userLoginId.getUserPassword())){
                System.out.println("로그인 성공");
                return userLoginId;

            }
            else{
                System.out.println("아이디와 패스워드가 맞지 않습니다.");
            }

            return null;
        }
    }

    public User userInfo(UserInfoDto userInfoDto){
        User userInfo = userRepo.findByUserId(userInfoDto.getUserId());
        return userInfo;
    }

    public User getUserById(int userId) {
        User user = userRepo.findByUserId(userId);
        return user;
    }
    /**
     * 유저 닉네임 검색
     */
    @Transactional
    public Page<SearchNameResponseDto> searchNickname(String keyword, Pageable pageable) {

        Page<User> userPage = userRepo.findByUserNicknameContaining(keyword, pageable);
        return userPage.map(this::convertToSearchNicknameDto);
    }

    private SearchNameResponseDto convertToSearchNicknameDto(User user) {
        return new SearchNameResponseDto(
                user.getUserId(),
                user.getUserNickname()
        );
    }

    // 회원수정
    @Transactional
    public User modifyUser(UserInfoModifyDto userInfoModifyDto) {
        Badge badge = badgeService.getBadge(userInfoModifyDto.getBadgeId());
        User user = userRepo.findByUserId(userInfoModifyDto.getUserId());

        user.setUserNickname(userInfoModifyDto.getUserNickname());
        user.setUserPhone(userInfoModifyDto.getUserPhone());
        user.setUserImg(userInfoModifyDto.getUserImg());
        user.setBadgeId(badge);
        return user;
    }


}
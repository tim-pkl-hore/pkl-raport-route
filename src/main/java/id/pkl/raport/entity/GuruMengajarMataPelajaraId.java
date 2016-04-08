package id.pkl.raport.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class GuruMengajarMataPelajaraId implements Serializable{
	
	@Column(name="guru_id")
	private Long guruId;
	
	@Column(name="mata_pelajaran_id")
	private Long mataPelajaranId;

	public Long getGuruId() {
		return guruId;
	}

	public void setGuruId(Long guruId) {
		this.guruId = guruId;
	}

	public Long getMataPelajaranId() {
		return mataPelajaranId;
	}

	public void setMataPelajaranId(Long mataPelajaranId) {
		this.mataPelajaranId = mataPelajaranId;
	}
	
	
	
	

}

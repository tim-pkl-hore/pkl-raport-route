package id.pkl.raport.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name="kompetensi_dasar")
public class KompetensiDasar {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="id")
	private Long id;
	
	@NotBlank
	@Column(name="description")
	private String description;

	@Column(name="order_index")
	private Integer orderIndex;
	
	@ManyToOne
	@JoinColumn(name="kompetensi_inti_id", referencedColumnName="id")
	private KompetensiInti kompetensiInti;
	
	@ManyToOne
	@JoinColumn(name="mata_pelajaran_id", referencedColumnName="id")
	private MataPelajaran mataPelajaran;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getOrderIndex() {
		return orderIndex;
	}

	public void setOrderIndex(Integer order) {
		this.orderIndex = order;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public KompetensiInti getKompetensiInti() {
		return kompetensiInti;
	}

	public void setKompetensiInti(KompetensiInti kompetensiInti) {
		this.kompetensiInti = kompetensiInti;
	}

	public MataPelajaran getMataPelajaran() {
		return mataPelajaran;
	}

	public void setMataPelajaran(MataPelajaran mataPelajaran) {
		this.mataPelajaran = mataPelajaran;
	}
}
